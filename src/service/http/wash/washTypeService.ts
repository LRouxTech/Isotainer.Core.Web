import axiosInstance from "../../../api/axiosInstance.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {WashTypeItem} from "../../../model/wash/washType/washTypeListResponse.ts";
import type {WashTypeResponse} from "../../../model/wash/washType/washTypeResponse.ts";
import type {UpdateWashTypeRequest} from "../../../model/wash/washType/updateWashTypeRequest.ts";
import type {CreateWashTypeRequest} from "../../../model/wash/washType/createWashTypeRequest.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";

const API_BASE_URL = '/api/wash/washtype';

export const washTypeService = {
    getWashTypesList: async (pagination : PagedRequest): Promise<PagedList<WashTypeItem>> => {
        const response = await axiosInstance.get<PagedList<WashTypeItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
        return response.data;
    },

    createWashType: async (request: CreateWashTypeRequest): Promise<WashTypeResponse> => {
        const response = await axiosInstance.post<WashTypeResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateWashType: async (request: UpdateWashTypeRequest, id : string): Promise<WashTypeResponse> => {
        const response = await axiosInstance.put<WashTypeResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    deleteWashType: async (id : string): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    getWashTypeStats: async (): Promise<CardInformation> => {
        const response = await axiosInstance.get<CardInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    }
}