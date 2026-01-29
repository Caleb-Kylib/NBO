import { supabase } from '../lib/supabaseClient';

export const businessService = {
    /**
     * Upload business profile image to Supabase Storage
     */
    async uploadImage(file, userId) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `business-profiles/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    },

    /**
     * Fetch businesses with filtering and pagination
     */
    async getBusinesses({ category = '', search = '', limit = 10, offset = 0 } = {}) {
        let query = supabase
            .from('businesses')
            .select('*', { count: 'exact' });

        if (category) {
            query = query.eq('category', category);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%,location.ilike.%${search}%`);
        }

        const { data, count, error } = await query
            .range(offset, offset + limit - 1)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map Supabase fields to app fields
        const mappedData = data.map(b => ({
            ...b,
            trustStatus: b.verified ? 'verified' : 'pending',
            rating: b.trust_score || 5.0,
            reviewCount: 3,
            image: b.profile_image || null,
            services: Array.isArray(b.services) ? b.services : (typeof b.services === 'string' ? b.services.split(',').map(s => s.trim()) : [])
        }));

        return { data: mappedData, count };
    },

    async getBusinessById(id) {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return {
            ...data,
            trustStatus: data.verified ? 'verified' : 'pending',
            rating: data.trust_score || 5.0,
            reviewCount: 3,
            image: data.profile_image,
            services: Array.isArray(data.services) ? data.services : (typeof data.services === 'string' ? data.services.split(',').map(s => s.trim()) : [])
        };
    },

    async getMerchantClaim(businessId) {
        const { data, error } = await supabase
            .from('merchant_claims')
            .select('*')
            .eq('business_id', businessId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    async createBusiness(businessData, ownerId) {
        const { data, error } = await supabase
            .from('businesses')
            .insert([{
                name: businessData.name,
                category: businessData.category,
                description: businessData.description,
                location: businessData.location,
                phone: businessData.phone,
                profile_image: businessData.profile_image,
                owner_id: ownerId,
                services: Array.isArray(businessData.services) ? businessData.services : businessData.services.split(',').map(s => s.trim())
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateBusiness(id, businessData) {
        const { data, error } = await supabase
            .from('businesses')
            .update({
                name: businessData.name,
                category: businessData.category,
                description: businessData.description,
                location: businessData.location,
                phone: businessData.phone,
                profile_image: businessData.profile_image,
                services: Array.isArray(businessData.services) ? businessData.services : businessData.services.split(',').map(s => s.trim()),
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getBusinessByOwnerId(ownerId) {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('owner_id', ownerId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    },

    async getPaymentCredentials(businessId) {
        const { data, error } = await supabase
            .from('payment_credentials')
            .select('*')
            .eq('business_id', businessId)
            .eq('is_active', true);

        if (error) throw error;
        return data;
    }
};
