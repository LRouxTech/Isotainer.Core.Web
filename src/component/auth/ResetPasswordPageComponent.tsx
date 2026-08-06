import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

export function ResetPasswordPageComponent() {
    const navigate = useNavigate();

    // Checks if URL contains a token (e.g., /reset-password?token=xyz)
    // If token exists, show the "Set New Password" form; otherwise show "Request Link"
    const searchParams = useSearch({ strict: false });
    const token = (searchParams as { token?: string })?.token;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailSentSuccess, setEmailSentSuccess] = useState(false);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

    // Password Validation Rules
    const isFormValid =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9!@#$%^&*]/.test(password) &&
        password === confirmPassword;

    // Handle Stage 1: Request Reset Link
    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // await api.requestPasswordReset({ email });
            setEmailSentSuccess(true);
        } catch (error) {
            console.error('Reset request failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Stage 2: Submit New Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        try {
            // await api.resetPassword({ token, newPassword: password });
            setPasswordResetSuccess(true);
            setTimeout(() => {
                navigate({ to: '/_authenticated/users' });
            }, 2000);
        } catch (error) {
            console.error('Password reset failed:', error);
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
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-on-surface">
                        {token ? 'Reset Your Password' : 'Forgot Password?'}
                    </h1>
                    <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                        {token
                            ? 'Enter your new password credentials below.'
                            : 'Enter your registered email address to receive password reset instructions.'}
                    </p>
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm space-y-5">

                    {/* STAGE 1 SUCCESS: Link Sent */}
                    {!token && emailSentSuccess ? (
                        <div className="text-center py-4 space-y-3">
                            <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-600">
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <h2 className="text-sm font-bold text-on-surface">Check Your Email</h2>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                We sent a password reset link to <strong className="text-on-surface">{email}</strong>. Please check your inbox and spam folder.
                            </p>
                            <button
                                type="button"
                                onClick={() => setEmailSentSuccess(false)}
                                className="text-xs font-bold text-primary hover:underline pt-2 cursor-pointer"
                            >
                                Re-enter email address
                            </button>
                        </div>
                    ) : token && passwordResetSuccess ? (
                        /* STAGE 2 SUCCESS: Password Changed */
                        <div className="text-center py-4 space-y-3">
                            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600">
                                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h2 className="text-sm font-bold text-on-surface">Password Reset Complete</h2>
                            <p className="text-xs text-on-surface-variant">
                                Your account password has been updated. Redirecting you to login...
                            </p>
                        </div>
                    ) : !token ? (
                        /* STAGE 1 FORM: Request Reset Link */
                        <form onSubmit={handleRequestReset} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@iso-logistics.com"
                                    className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !email}
                                className="w-full h-9 px-4 rounded bg-blue-950 text-xs font-bold text-white hover:bg-blue-900 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                {isSubmitting ? 'Sending Request...' : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        /* STAGE 2 FORM: Set New Password with Token */
                        <form onSubmit={handleResetPassword} className="space-y-4">
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
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
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

                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full h-9 px-4 rounded bg-blue-950 text-xs font-bold text-white hover:bg-blue-900 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                {isSubmitting ? 'Updating Password...' : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}