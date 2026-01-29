import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiExternalLink } from 'react-icons/fi';

const SuccessModal = ({
    isOpen,
    title = "Success!",
    message = "Action completed successfully.",
    primaryAction,
    secondaryAction,
    autoRedirectDelay = 3000,
    showAutoRedirectProgress = true
}) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(autoRedirectDelay / 1000);

    useEffect(() => {
        if (!isOpen) return;

        let timer;
        if (autoRedirectDelay > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (primaryAction?.onClick) {
                            primaryAction.onClick();
                        } else if (primaryAction?.path) {
                            navigate(primaryAction.path);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isOpen, autoRedirectDelay, navigate, primaryAction]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
                {/* Auto-redirect progress bar */}
                {showAutoRedirectProgress && autoRedirectDelay > 0 && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
                        <div
                            className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                            style={{ width: `${(timeLeft / (autoRedirectDelay / 1000)) * 100}%` }}
                        ></div>
                    </div>
                )}

                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheck size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3 font-display">
                    {title}
                </h2>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            if (primaryAction.onClick) primaryAction.onClick();
                            else navigate(primaryAction.path);
                        }}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 text-lg flex items-center justify-center gap-2 group"
                    >
                        {primaryAction.label}
                        <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    {secondaryAction && (
                        <button
                            onClick={() => {
                                if (secondaryAction.onClick) secondaryAction.onClick();
                                else navigate(secondaryAction.path);
                            }}
                            className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {secondaryAction.label}
                            <FiArrowRight />
                        </button>
                    )}
                </div>

                {autoRedirectDelay > 0 && (
                    <p className="mt-8 text-xs text-slate-400 font-medium uppercase tracking-widest">
                        Redirecting to profile in {Math.ceil(timeLeft)}s...
                    </p>
                )}
            </div>
        </div>
    );
};

export default SuccessModal;
