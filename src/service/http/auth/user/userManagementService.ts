import type {CreateUserRequest} from "../../../../model/auth/user/request/createUserRequest.ts";
import axiosInstance from "../../../../api/axiosInstance.ts";
import type {UpdateUserRequest} from "../../../../model/auth/user/request/updateUserRequest.ts";
import type {UserDetailResponse} from "../../../../model/auth/user/response/userDetailResponse.ts";
import type {ListUser} from "../../../../model/auth/user/response/userListResponse.ts";
import type {UserDetailRequest} from "../../../../model/auth/user/request/userDetailRequest.ts";
import type {ArchiveUserRequest} from "../../../../model/auth/user/request/archiveUserRequest.ts";
import type {PagedList, PagedRequest} from "../../../../model/general/pagedList.ts";

const API_BASE_URL = '/api/users';

export const userManagementService = {
    createUser: async (request: CreateUserRequest): Promise<UserDetailResponse> => {
        const response = await axiosInstance.post<UserDetailResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateUser: async (request: UpdateUserRequest, userId : string): Promise<UserDetailResponse> => {
        const response = await axiosInstance.put<UserDetailResponse>(`${API_BASE_URL}/${userId}`, request);
        return response.data;
    },

    getUserList: async (pagination : PagedRequest): Promise<PagedList<ListUser>> => {
        const response = await axiosInstance.get<PagedList<ListUser>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
        return response.data;
    },

    getUser: async (request: UserDetailRequest): Promise<UserDetailResponse> => {
        const response = await axiosInstance.get<UserDetailResponse>(`${API_BASE_URL}/${request.userId}`);
        return response.data;
    },

    archiveUser: async (request: ArchiveUserRequest): Promise<boolean> => {
        const response = await axiosInstance.post<boolean>(`${API_BASE_URL}/${request.userId}`);
        return response.data;
    }
};