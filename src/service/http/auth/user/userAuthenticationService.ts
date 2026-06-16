import axiosInstance from "../../../../api/axiosInstance.ts";
import type {UserLoginRequest} from "../../../../model/auth/user/request/userLoginRequest.ts";
import type {SignedInUserResponse} from "../../../../model/auth/user/response/signedInUserResponse.ts";
import type {UserLogoutRequest} from "../../../../model/auth/user/request/userLogoutRequest.ts";
import type {AuthenticateUserRequest} from "../../../../model/auth/user/request/authenticateUserRequest.ts";
import type {PasswordCreationRequest} from "../../../../model/auth/user/request/passwordCreationRequest.ts";
import type {UpdatePasswordRequest} from "../../../../model/auth/user/request/updatePasswordRequest.ts";
import type {ResetPasswordRequest} from "../../../../model/auth/user/request/resetPasswordRequest.ts";

const API_BASE_URL = '/api/user';

export const userAuthenticationService = {
    login: async (request: UserLoginRequest): Promise<SignedInUserResponse> => {
        const response = await axiosInstance.post<SignedInUserResponse>(`${API_BASE_URL}/login`, request);
        return response.data;
    },

    logout: async (request: UserLogoutRequest): Promise<boolean> => {
        const response = await axiosInstance.post<boolean>(`${API_BASE_URL}/logout`, request);
        return response.data;
    },

    authenticate: async (request: AuthenticateUserRequest): Promise<SignedInUserResponse> => {
        const response = await axiosInstance.post<SignedInUserResponse>(`${API_BASE_URL}/authenticate`, request);
        return response.data;
    },

    setPassword: async (request: PasswordCreationRequest): Promise<boolean> => {
        const response = await axiosInstance.post<boolean>(`${API_BASE_URL}/set-password`, request);
        return response.data;
    },

    updatePassword: async (request: UpdatePasswordRequest): Promise<boolean> => {
        const response = await axiosInstance.post<boolean>(`${API_BASE_URL}/update-password`, request);
        return response.data;
    },

    resetPassword: async (request: ResetPasswordRequest): Promise<boolean> => {
        const response = await axiosInstance.post<boolean>(`${API_BASE_URL}/reset-password`, request);
        return response.data;
    },
};