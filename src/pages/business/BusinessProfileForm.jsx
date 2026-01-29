import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck, FiInfo, FiMapPin, FiBriefcase, FiType, FiCamera, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import BusinessLayout from '../../layouts/BusinessLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import { useAuth } from '../../context/AuthContext';
import { businessService } from '../../services/businessService';

const BusinessProfileForm = ({ mode = 'create' }) => {
    const navigate = useNavigate();
    const { user, businessData, saveBusinessProfile } = useAuth();
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    const [formData, setFormData] = useState({
        name: businessData?.name || '',
        category: businessData?.category || '',
        services: businessData?.services || '',
        phone: businessData?.phone || '',
        whatsapp: businessData?.whatsapp || '',
        location: businessData?.location || '',
        description: businessData?.description || '',
        profile_image: businessData?.profile_image || businessData?.image || '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(formData.profile_image || '');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newBusinessId, setNewBusinessId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        // Validation for each step
        if (step === 1 && (!formData.name || !formData.category)) {
            toast.error("Name and Category are required");
            return;
        }
        if (step === 2 && !formData.phone) {
            toast.error("Phone number is required");
            return;
        }
        setStep(prev => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image too large. Max 5MB.");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        setFormData(prev => ({ ...prev, profile_image: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to save a business profile");
            navigate("/business/login");
            return;
        }

        try {
            setIsSubmitting(true);

            let profile_image = formData.profile_image;

            // Upload new image if selected
            if (imageFile) {
                toast.loading("Uploading image...", { id: 'upload' });
                profile_image = await businessService.uploadImage(imageFile, user.id);
                toast.success("Image uploaded!", { id: 'upload' });
            }

            const submissionData = {
                ...formData,
                profile_image
            };

            const id = await saveBusinessProfile(submissionData);
            setNewBusinessId(id);
            toast.success(mode === 'edit' ? "Profile updated successfully!" : "Business profile created successfully!");
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Submission Error:", err);
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8 text-blue-600">
                            <FiType size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name *</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Mama Rocks Burgers"
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                                <select
                                    required
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900 appearance-none bg-white"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Cafe">Cafe</option>
                                    <option value="Beauty & Spa">Beauty & Spa</option>
                                    <option value="Pharmacy & Health Stores">Pharmacy & Health Stores</option>
                                    <option value="Bakeries">Bakeries</option>
                                    <option value="Butcheries">Butcheries</option>
                                    <option value="Wine & Beverage Shops">Wine & Beverage Shops</option>
                                    <option value="Bookshops">Bookshops</option>
                                    <option value="Stationery & Office Supplies">Stationery & Office Supplies</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Services Offered</label>
                                <input
                                    type="text"
                                    name="services"
                                    value={formData.services}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Delivery, Takeaway, Outdoor Seating"
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                />
                                <p className="mt-2 text-xs text-slate-400 italic">Separate services with commas</p>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8 text-blue-600">
                            <FiMapPin size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Contact & Location</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="07XX XXX XXX"
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleInputChange}
                                        placeholder="07XX XXX XXX"
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Location *</label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Westlands, Nairobi"
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8 text-blue-600">
                            <FiCamera size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Profile Image</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 mb-4">Upload a photo to help your business stand out. If skipped, we'll use a category placeholder.</p>

                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 hover:border-blue-400 transition-colors">
                                {imagePreview ? (
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                                        <img src={imagePreview} alt="Selected" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-rose-600 shadow-xl hover:bg-white"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center gap-4 cursor-pointer">
                                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                            <FiCamera size={32} />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-slate-900">Click to upload photo</p>
                                            <p className="text-sm text-slate-400">PNG, JPG or WebP (max 5MB)</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8 text-blue-600">
                            <FiInfo size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Description</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">About your business *</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="6"
                                placeholder="Tell customers what makes your business unique..."
                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900 resize-none"
                            ></textarea>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 text-emerald-600">
                            <FiCheck size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-100">
                            <div className="flex items-center gap-6 mb-4">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 shadow-inner">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <FiBriefcase size={32} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{formData.name || 'Your Business'}</h4>
                                    <p className="text-slate-500">{formData.category || 'Category'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-semibold text-slate-900">{formData.location || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                                    <p className="font-semibold text-slate-900">{formData.phone || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <BusinessLayout>
            <SuccessModal
                isOpen={showSuccessModal}
                title={mode === 'edit' ? 'Changes Saved!' : 'Profile Created!'}
                message={mode === 'edit'
                    ? 'Your changes are now live.'
                    : '✅ Your business profile has been registered and is now live on Nairobiz.'}
                primaryAction={{
                    label: "Go to Dashboard",
                    path: "/business/dashboard"
                }}
                secondaryAction={{
                    label: "View Public Page",
                    path: `/business/profile/${newBusinessId || 'demo'}`
                }}
                autoRedirectDelay={3000}
            />

            <div className="p-6 md:p-12 max-w-2xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        {mode === 'edit' ? 'Edit Profile' : 'Create Profile'}
                    </h1>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
                    {renderStep()}

                    <div className="mt-12 flex justify-between border-t border-slate-50 pt-8">
                        <button type="button" onClick={prevStep} disabled={step === 1} className={`font-bold transition-opacity ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600'}`}>Previous</button>
                        {step < totalSteps ? (
                            <button type="button" onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">Next Step</button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 min-w-[160px] hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    'Complete Setup'
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </BusinessLayout>
    );
};

export default BusinessProfileForm;
