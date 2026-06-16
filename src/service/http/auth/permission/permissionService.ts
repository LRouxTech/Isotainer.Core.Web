import type {PermissionListResponse} from "../../../../model/auth/permission/permissionListResponse.ts";
import axiosInstance from "../../../../api/axiosInstance.ts";

const API_BASE_URL = '/api/permission';

export const permissionService = {
    getPermissions: async (): Promise<PermissionListResponse> => {
        const response = await axiosInstance.get<PermissionListResponse>(`${API_BASE_URL}/`);
        return response.data;
    }
};