import { createContext, useContext } from 'react';
import {useMutation} from "@tanstack/react-query";
import type {ResetPasswordRequest} from "../../../model/auth/user/request/resetPasswordRequest.ts";
import {userAuthenticationService} from "../../http/auth/user/userAuthenticationService.ts";

export interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: async (requestPayload: ResetPasswordRequest) => {
            return await userAuthenticationService.resetPassword(requestPayload);
        },
    });
}