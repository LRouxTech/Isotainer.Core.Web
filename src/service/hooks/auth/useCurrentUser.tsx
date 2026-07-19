import { useState } from 'react';

export interface UserProfile {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export function useCurrentUser(): UserProfile | null {
    const [user] = useState<UserProfile | null>(() => {
        const raw = localStorage.getItem('user_profile');
        if (!raw) return null;
        try {
            return JSON.parse(raw) as UserProfile;
        } catch {
            return null;
        }
    });

    return user;
}