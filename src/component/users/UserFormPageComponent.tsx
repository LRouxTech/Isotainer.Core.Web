import React from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCreateUser, useUpdateUser, useUserItem } from "../../service/hooks/user/useUser.ts";
import { usePermissionRecords } from "../../service/hooks/user/usePermissions.ts";
import { useRoleRecords } from "../../service/hooks/user/useRoles.ts";

export function UserFormPageComponent() {
    const navigate = useNavigate();

    const params = useParams({ strict: false });
    const userId = params.userId as string;
    const isEditMode = Boolean(userId);

    const handleCancel = () => {
        navigate({ to: '/users' });
    };

    const createMutation = useCreateUser();
    const updateMutation = useUpdateUser();
    const { data: userRecord, isLoading: isUserLoading } = useUserItem({ userId });
    const { data: permissionRecords, isLoading: isPermissionLoading } = usePermissionRecords();
    const { data: roleRecords, isLoading: isRoleLoading } = useRoleRecords();

    const form = useForm({
        defaultValues: {
            userId: "",
            name: "",
            surname: "",
            username: "",
            email: "",
            role: "",
            permissions: [] as string[],
        },
        onSubmit: async ({ value }) => {
            const fullUserName = `${value.name.trim()} ${value.surname.trim()}`.trim() || value.username;

            const payload = {
                userId: userId,
                name: value.name,
                surname: value.surname,
                userName: value.username || fullUserName,
                email: value.email,
                roles: value.role ? [value.role] : [],
                permissions: value.permissions,
            };

            if (isEditMode && userId) {
                await updateMutation.mutateAsync(payload);
            } else {
                await createMutation.mutateAsync(payload);
            }

            navigate({ to: '/users' });
        },
    });

    React.useEffect(() => {
        if (userRecord && isEditMode) {
            const [firstName = "", ...surnameParts] = (userRecord.userName || "").split(" ");
            const surname = surnameParts.join(" ");

            form.setFieldValue("name", firstName);
            form.setFieldValue("surname", surname);
            form.setFieldValue("username", userRecord.userName);
            form.setFieldValue("email", userRecord.email);

            const primaryRole = userRecord.roles?.[0] ?? "";
            form.setFieldValue("role", primaryRole);

            form.setFieldValue("permissions", userRecord.permissions ?? []);
        }
    }, [userRecord, isEditMode, form]);

    const handleRoleChange = (roleId: string, setRoleField: (v: string) => void) => {
        setRoleField(roleId);

        const selectedRole = roleRecords?.roleItems?.find((r) => r.id === roleId);
        if (selectedRole?.permissionIds) {
            form.setFieldValue("permissions", selectedRole.permissionIds);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-on-surface">User Management</h1>
                    <p className="text-sm text-on-surface-variant mt-0.5">
                        {isEditMode ? "Edit organizational personnel and access rights." : "Create organizational personnel and access rights."}
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
                                disabled={!canSubmit || isSubmitting || (isEditMode && isUserLoading)}
                                className="inline-flex items-center gap-2 h-[36px] px-5 rounded bg-blue-950 text-xs font-bold text-white hover:bg-blue-900 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                            >
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                {isSubmitting ? "Saving..." : isEditMode ? "Update User" : "Save User"}
                            </button>
                        )}
                    </form.Subscribe>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-12">

                <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest space-y-5">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
                        Profile Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="e.g. Marcus"
                                        className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                    />
                                </div>
                            )}
                        </form.Field>

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
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="e.g. Aurelius"
                                        className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                    />
                                </div>
                            )}
                        </form.Field>

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
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="maurelius"
                                            className="w-full h-9 pl-7 pr-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </form.Field>

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
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="m.aurelius@iso-logistics.com"
                                        className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="role">
                        {(field) => (
                            <div>
                                <label htmlFor={field.name} className="block text-xs font-bold text-on-surface mb-1.5">
                                    Organizational Role
                                </label>
                                <select
                                    id={field.name}
                                    value={field.state.value ?? ""}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => handleRoleChange(e.target.value, field.handleChange)}
                                    disabled={isRoleLoading}
                                    className="w-full h-9 px-3 rounded border border-outline-variant bg-surface-container-lowest text-xs text-on-surface focus:border-primary focus:outline-none cursor-pointer disabled:opacity-50"
                                >
                                    <option value="" disabled>
                                        {isRoleLoading ? "Loading roles..." : "Select a role..."}
                                    </option>
                                    {roleRecords?.roleItems?.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </form.Field>
                </div>

                <div className="p-6 rounded-xl border border-outline-variant/60 bg-surface-container-lowest space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
                            Granular Permissions
                        </h2>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-700">
                            Custom Access
                        </span>
                    </div>

                    {isPermissionLoading ? (
                        <div className="p-4 text-xs text-slate-500 animate-pulse">Loading permissions...</div>
                    ) : (
                        <form.Field name="permissions">
                            {(field) => {
                                const currentPermissions: string[] = field.state.value ?? [];

                                const togglePermission = (permId: string) => {
                                    const updated = currentPermissions.includes(permId)
                                        ? currentPermissions.filter((id) => id !== permId)
                                        : [...currentPermissions, permId];
                                    field.handleChange(updated);
                                };

                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {permissionRecords?.permissionItems?.map((perm) => {
                                            const isChecked = currentPermissions.includes(perm.id);

                                            return (
                                                <label
                                                    key={perm.id}
                                                    htmlFor={`perm-${perm.id}`}
                                                    className={`flex items-center justify-between p-3 rounded-lg border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container/10 transition-colors cursor-pointer ${
                                                        isChecked ? "border-primary/50 bg-primary/5" : ""
                                                    }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold text-on-surface">
                                                            {perm.permissionName}
                                                        </span>
                                                        {perm.section && (
                                                            <span className="text-[10px] text-outline">
                                                                {perm.section}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        id={`perm-${perm.id}`}
                                                        checked={isChecked}
                                                        onChange={() => togglePermission(perm.id)}
                                                        className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>
                                );
                            }}
                        </form.Field>
                    )}
                </div>
            </div>
        </form>
    );
}