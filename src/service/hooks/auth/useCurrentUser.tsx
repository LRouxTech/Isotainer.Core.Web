import {useEffect, useState} from 'react';

export interface UserProfile {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export const AUTH_CHANGE_EVENT = 'app:auth-change';

export function notifyAuthChange() {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function useCurrentUser(): UserProfile | null {
    const getUserFromStorage = (): UserProfile | null => {
        const raw = localStorage.getItem('user_profile');
        if (!raw) return null;
        try {
            return JSON.parse(raw) as UserProfile;
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState<UserProfile | null>(getUserFromStorage);

    useEffect(() => {
        const handleSync = () => {
            setUser(getUserFromStorage());
        };

        window.addEventListener('storage', handleSync);
        window.addEventListener(AUTH_CHANGE_EVENT, handleSync);

        return () => {
            window.removeEventListener('storage', handleSync);
            window.removeEventListener(AUTH_CHANGE_EVENT, handleSync);
        };
    }, []);

    return user;
}