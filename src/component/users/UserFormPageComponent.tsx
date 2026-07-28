import { useForm } from "@tanstack/react-form";
import {useNavigate, useParams} from "@tanstack/react-router";
import {useCreateUser, useUpdateUser} from "../../service/hooks/user/useUser.ts";

export function UserFormPageComponent() {
    const navigate = useNavigate();

    const params = useParams({ strict: false });
    const userId = params.userId;
    const isEditMode = Boolean(userId);

    const handleCancel = () => {
        navigate({ to: '/users' });
    };

    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();

    const form = useForm({
        defaultValues: {
            name: "",
            surname: "",
            username: "",
            email: "",
            role: "",
            permissions: {
                viewDashboard: true,
                createTank: false,
                deleteUser: false,
                manageInvoices: false,
                editMasterData: false,
                auditLogs: false,
            },
        },
        onSubmit: async ({ value }) => {
            console.log("Submitting User Form Data:", value);
            // Add API call here (e.g. createUserMutation or updateUserMutation)
            navigate({ to: '/users' });
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-6"
        >
            {/* Page Header & Top Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">User Management</h1>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                        {isEditMode ? "Edit organizational personnel and access rights." : "Create or edit organizational personnel and access rights."}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="h-[36px] px-5 rounded border border-outline-variant bg-surface-container-lowest text-xs font-semibold text-on-surface hover:bg-surface-container/20 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="inline-flex items-center gap-2 h-[36px] px-5 rounded bg-blue-950 text-xs font-bold text-white hover:bg-blue-900 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                {isSubmitting ? "Saving..." : "Save User"}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </div>

            {/* Main Content Layout (Left Form Sections, Right Sidebar Info) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Form Inputs & Granular Permissions */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Profile Details Card */}
                    <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest space-y-5">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
                            Profile Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <form.Field
                                name="name"
                                validators={{ onChange: ({ value }) => (!value ? "Name is required" : undefined) }}
                            >
                                {(field) => (
                                    <div>
                                        <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                            Name
                                        </label>
                                        <input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="e.g. Marcus"
                                            className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Surname */}
                            <form.Field
                                name="surname"
                                validators={{ onChange: ({ value }) => (!value ? "Surname is required" : undefined) }}
                            >
                                {(field) => (
                                    <div>
                                        <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                            Surname
                                        </label>
                                        <input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="e.g. Aurelius"
                                            className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Username */}
                            <form.Field
                                name="username"
                                validators={{ onChange: ({ value }) => (!value ? "Username is required" : undefined) }}
                            >
                                {(field) => (
                                    <div>
                                        <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-xs text-outline font-semibold">@</span>
                                            <input
                                                id={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="maurelius"
                                                className="w-full h-9 pl-7 pr-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </form.Field>

                            {/* Email Address */}
                            <form.Field
                                name="email"
                                validators={{ onChange: ({ value }) => (!value ? "Email is required" : undefined) }}
                            >
                                {(field) => (
                                    <div>
                                        <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            id={field.name}
                                            type="email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="m.aurelius@iso-logistics.com"
                                            className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Role Selection */}
                        <form.Field name="role">
                            {(field) => (
                                <div>
                                    <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                        Organizational Role
                                    </label>
                                    <select
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface focus:border-primary focus:outline-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select a role...</option>
                                        <option value="SYSTEM ADMIN">System Admin</option>
                                        <option value="MANAGER">Manager</option>
                                        <option value="OPERATOR">Operator</option>
                                        <option value="FINANCIALS">Financials</option>
                                    </select>
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Granular Permissions Card */}
                    <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
                                Granular Permissions
                            </h2>
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-700">
                                Custom Access
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { name: "permissions.viewDashboard", label: "View Dashboard" },
                                { name: "permissions.createTank", label: "Create Tank" },
                                { name: "permissions.deleteUser", label: "Delete User" },
                                { name: "permissions.manageInvoices", label: "Manage Invoices" },
                                { name: "permissions.editMasterData", label: "Edit Master Data" },
                                { name: "permissions.auditLogs", label: "Audit Logs" },
                            ].map((permission) => (
                                <form.Field key={permission.name} name={permission.name as any}>
                                    {(field) => (
                                        <label
                                            htmlFor={permission.name}
                                            className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container/10 transition-colors cursor-pointer"
                                        >
                                            <span className="text-xs font-semibold text-on-surface">{permission.label}</span>
                                            <input
                                                type="checkbox"
                                                id={permission.name}
                                                checked={Boolean(field.state.value)}
                                                onChange={(e) => field.handleChange(e.target.checked)}
                                                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                                            />
                                        </label>
                                    )}
                                </form.Field>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar Info Widgets */}
                <div className="space-y-6">

                    {/* Access Intelligence Card */}
                    <div className="p-6 rounded-xl bg-blue-950 text-white space-y-4">
                        <h3 className="font-bold text-sm text-white">Access Intelligence</h3>
                        <p className="text-xs text-blue-200 leading-relaxed">
                            Roles determine the baseline access. Permissions selected here will override default role behavior for this specific user.
                        </p>
                        <div className="p-3 rounded-lg bg-white/10 flex items-center gap-2 text-xs font-mono text-blue-100 border border-white/10">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>SEC_LEVEL: ALPHA_3</span>
                        </div>
                    </div>

                    {/* Security Overview List */}
                    <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest space-y-4">
                        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                            Security Overview
                        </h4>

                        <div className="space-y-4">
                            {/* Item 1 */}
                            <div className="flex gap-3">
                                <div className="p-2 rounded bg-blue-500/10 text-blue-600 h-fit shrink-0">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="text-xs font-bold text-on-surface">MFA Required</h5>
                                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                                        Multi-factor authentication is enforced for all new organizational accounts.
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex gap-3">
                                <div className="p-2 rounded bg-blue-500/10 text-blue-600 h-fit shrink-0">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="text-xs font-bold text-on-surface">Activity Tracking</h5>
                                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                                        All modifications to tank washing records and financials are logged to the blockchain trail.
                                    </p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex gap-3">
                                <div className="p-2 rounded bg-blue-500/10 text-blue-600 h-fit shrink-0">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="text-xs font-bold text-on-surface">Account Expiry</h5>
                                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                                        Set to 'Never' by default. Manager approval required for temporary access tokens.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branding / Banner Widget */}
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 border border-outline-variant/60 flex items-end p-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <span className="relative z-20 px-2.5 py-1 rounded bg-white/20 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
                            Global Logistics Portal
                        </span>
                    </div>

                </div>
            </div>
        </form>
    );
}