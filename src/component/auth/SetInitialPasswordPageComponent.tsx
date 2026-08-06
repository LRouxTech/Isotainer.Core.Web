import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function SetInitialPasswordPageComponent() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation Rules
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumberOrSymbol = /[0-9!@#$%^&*]/.test(password);
    const passwordsMatch = password.length > 0 && password === confirmPassword;
    const isFormValid = hasMinLength && hasUppercase && hasNumberOrSymbol && passwordsMatch;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        try {
            // API call to set initial password using token & password
            // await api.setInitialPassword({ token, password });

            setIsSuccess(true);
            setTimeout(() => {
                navigate({ to: '/_authenticated/users' });
            }, 2000);
        } catch (error) {
            console.error('Failed to set password:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container/30 p-4">
            <div className="w-full max-w-md space-y-6">

                {/* Brand Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-950 text-white shadow-md mb-2">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-on-surface">Welcome to ISO-Master</h1>
                    <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                        Please set a strong password to activate your new user profile.
                    </p>
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm space-y-5">

                    {isSuccess ? (
                        <div className="text-center py-6 space-y-3">
                            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600">
                                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold text-on-surface">Account Activated!</h2>
                            <p className="text-xs text-on-surface-variant">
                                Your password has been configured successfully. Redirecting you to the portal...
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* New Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full h-9 pl-3 pr-10 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface focus:border-primary focus:outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2 text-outline hover:text-on-surface transition-colors cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Password Requirements Checklist */}
                            <div className="p-3 rounded-lg bg-surface-container/50 space-y-2 border border-outline-variant/40">
                                <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                                    Password Requirements
                                </p>
                                <div className="space-y-1.5 text-xs">
                                    <div className={`flex items-center gap-2 ${hasMinLength ? 'text-emerald-600 font-semibold' : 'text-outline'}`}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>At least 8 characters long</span>
                                    </div>

                                    <div className={`flex items-center gap-2 ${hasUppercase ? 'text-emerald-600 font-semibold' : 'text-outline'}`}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>At least one uppercase letter (A-Z)</span>
                                    </div>

                                    <div className={`flex items-center gap-2 ${hasNumberOrSymbol ? 'text-emerald-600 font-semibold' : 'text-outline'}`}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>At least one number or special character</span>
                                    </div>

                                    <div className={`flex items-center gap-2 ${passwordsMatch ? 'text-emerald-600 font-semibold' : 'text-outline'}`}>
                                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>Passwords match</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full h-9 px-4 rounded bg-blue-950 text-xs font-bold text-white hover:bg-blue-900 transition-colors cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {isSubmitting ? 'Setting Password...' : 'Set Password & Activate'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}