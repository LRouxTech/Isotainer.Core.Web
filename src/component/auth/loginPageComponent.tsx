import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import {useLoginMutation} from "../../service/hooks/auth/userLoginMutation.tsx";
import type {UserLoginRequest} from "../../model/auth/user/request/userLoginRequest.ts";

export function LoginPageComponent() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const loginMutation = useLoginMutation();

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const requestPayload: UserLoginRequest = {
                userName: value.username,
                password: value.password,
            };

            loginMutation.mutate(requestPayload);
        },
    });

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-background p-6 font-sans antialiased selection:bg-primary-container selection:text-on-primary-container">
            <div className="w-full max-w-[440px] rounded-lg border border-outline-variant bg-surface-container-lowest p-10 shadow-sm">

                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 text-on-surface">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <desc>Isotainer Grid Logo</desc>
                            <path d="M7 16v4" />
                            <path d="M17 16v4" />
                            <circle cx="7" cy="20" r="1" fill="currentColor" />
                            <circle cx="17" cy="20" r="1" fill="currentColor" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-primary">ISO-Master</h1>
                    <p className="text-sm font-normal text-on-surface-variant mt-1">Logistics Management System</p>
                </div>

                {loginMutation.isError && (
                    <div className="mb-5 rounded bg-error-container p-3 text-sm text-on-error-container font-medium border border-error/20">
                        {(loginMutation.error).message || 'Invalid username or password.'}
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-5"
                >
                    <form.Field
                        name="username"
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) return 'Username or Email is required';
                                if (value.length < 3) return 'Must be at least 3 characters';
                                return undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div>
                                <label htmlFor={field.name} className="block text-sm font-bold text-on-surface mb-1.5">
                                    Username or Email
                                </label>
                                <div className="relative flex items-center h-[36px]">
                  <span className="absolute left-3 text-outline">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                  </span>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Enter your username"
                                        className={`w-full h-full rounded border bg-surface-container-lowest pl-9 pr-3 text-sm text-on-surface placeholder:text-outline transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                                            field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                        }`}
                                    />
                                </div>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="mt-1 text-xs font-medium text-error">{field.state.meta.errors.join(', ')}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) return 'Password is required';
                                if (value.length < 8) return 'Password must be at least 8 characters';
                                return undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div>
                                <label htmlFor={field.name} className="block text-sm font-bold text-on-surface mb-1.5">
                                    Password
                                </label>
                                <div className="relative flex items-center h-[36px]">
                  <span className="absolute left-3 text-outline">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={showPassword ? 'text' : 'password'}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full h-full rounded border bg-surface-container-lowest pl-9 pr-10 text-sm text-on-surface placeholder:text-outline transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                                            field.state.meta.errors.length ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 text-outline hover:text-on-surface-variant focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                                {field.state.meta.errors.length > 0 && (
                                    <p className="mt-1 text-xs font-medium text-error">{field.state.meta.errors.join(', ')}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary"
                        />
                        <label htmlFor="rememberMe" className="ml-2 select-none text-sm text-on-surface-variant font-medium">
                            Remember me
                        </label>
                    </div>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting || loginMutation.isPending}
                                className="flex w-full h-[36px] items-center justify-center gap-2 rounded bg-primary text-sm font-medium text-on-primary transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting || loginMutation.isPending ? 'Signing In...' : (
                                    <>
                                        Sign In
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                                    </>
                                )}
                            </button>
                        )}
                    </form.Subscribe>
                </form>

                <div className="mt-5 text-center">
                    <a href="#forgot" className="text-sm font-bold text-primary hover:underline">
                        Forgot Password?
                    </a>
                </div>

                <hr className="my-6 border-outline-variant" />

                <div className="text-center text-[11px] font-bold tracking-wider text-on-surface-variant uppercase">
                    <p>© 2026 ISO-LOGISTICS TANK MANAGEMENT</p>
                    <div className="mt-1 flex justify-center gap-2 text-outline">
                        <a href="#privacy" className="hover:underline">Privacy Policy</a>
                        <span>•</span>
                        <a href="#support" className="hover:underline">Support</a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 flex w-full justify-between px-6 font-mono text-[13px] text-on-surface-variant hidden sm:flex">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    SERVER: ISO-NODE-01
                </div>
                <div>v2.4.0-STABLE</div>
            </div>
        </div>
    );
}