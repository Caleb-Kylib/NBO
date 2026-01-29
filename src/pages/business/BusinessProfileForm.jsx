import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck, FiInfo, FiMapPin, FiBriefcase, FiType } from 'react-icons/fi';
import BusinessLayout from '../../layouts/BusinessLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import { useAuth } from '../../context/AuthContext';

const BusinessProfileForm = ({ mode = 'create' }) => {
    const navigate = useNavigate();
    const { businessData, saveBusinessProfile } = useAuth();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        name: businessData?.name || '',
        category: businessData?.category || '',
        services: businessData?.services || '',
        phone: businessData?.phone || '',
        whatsapp: businessData?.whatsapp || '',
        location: businessData?.location || '',
        description: businessData?.description || '',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newBusinessId, setNewBusinessId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = saveBusinessProfile(formData);
        setNewBusinessId(id);
        setShowSuccessModal(true);
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Mama Rocks Burgers"
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                <select
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
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                    <input
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Location</label>
                                <input
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
                            <FiInfo size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Description</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">About your business</label>
                            <textarea
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
            case 4:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 text-emerald-600">
                            <FiCheck size={24} />
                            <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
                        </div>
                        <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-100">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Business Name</p>
                                    <p className="font-semibold text-slate-900">{formData.name || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
                                    <p className="font-semibold text-slate-900">{formData.category || 'Not specified'}</p>
                                </div>
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
                    path: `/business/${newBusinessId || 'demo'}`
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
                        <button type="button" onClick={prevStep} disabled={step === 1} className={`font-bold ${step === 1 ? 'opacity-0' : 'text-slate-400'}`}>Previous</button>
                        {step < totalSteps ? (
                            <button type="button" onClick={nextStep} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Next Step</button>
                        ) : (
                            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Complete Setup</button>
                        )}
                    </div>
                </form>
            </div>
        </BusinessLayout>
    );
};

export default BusinessProfileForm;
