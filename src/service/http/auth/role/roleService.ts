import type {RoleListResponse} from "../../../../model/auth/role/roleListResponse.ts";
import axiosInstance from "../../../../api/axiosInstance.ts";

const API_BASE_URL = '/api/role';

export const roleService = {
    getRoles: async (): Promise<RoleListResponse> => {
        const response = await axiosInstance.get<RoleListResponse>(`${API_BASE_URL}/`);
        return response.data;
    }
};