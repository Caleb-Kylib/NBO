import React from 'react';
import BusinessLayout from '../../layouts/BusinessLayout';
import { FiClock, FiShield } from 'react-icons/fi';

const Verification = () => {
    return (
        <BusinessLayout hasBusiness={true}>
            <div className="p-6 md:p-12 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Verification</h1>
                    <p className="text-slate-500">Get your blue badge and gain more trust with local customers.</p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 md:p-12 text-center border-b border-slate-50">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShield size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">You are currently Verified!</h2>
                        <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                            Your business listing has been reviewed and approved by the Nairobiz team.
                        </p>
                    </div>

                    <div className="p-8 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                <FiCheckCircle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">Identity Check</h3>
                                <p className="text-xs text-slate-400">Successfully completed on Jan 24, 2026</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                <FiClock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">Renewal Date</h3>
                                <p className="text-xs text-slate-400">Next review scheduled for Jan 2027</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessLayout>
    );
};

export default Verification;
