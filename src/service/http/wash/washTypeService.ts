import axiosInstance from "../../../api/axiosInstance.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {WashTypeListResponse} from "../../../model/wash/washType/washTypeListResponse.ts";
import type {WashTypeResponse} from "../../../model/wash/washType/washTypeResponse.ts";
import type {UpdateWashTypeRequest} from "../../../model/wash/washType/updateWashTypeRequest.ts";
import type {CreateWashTypeRequest} from "../../../model/wash/washType/createWashTypeRequest.ts";

const API_BASE_URL = '/api/wash/washtype';

export const washTypeService = {
    getWashTypesList: async (): Promise<WashTypeListResponse> => {
        const response = await axiosInstance.get<WashTypeListResponse>(`${API_BASE_URL}/`);
        return response.data;
    },

    createWashType: async (request: CreateWashTypeRequest): Promise<WashTypeResponse> => {
        const response = await axiosInstance.post<WashTypeResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateWashType: async (request: UpdateWashTypeRequest, id : number): Promise<WashTypeResponse> => {
        const response = await axiosInstance.put<WashTypeResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    deleteWashType: async (id : number): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    getWashTypeStats: async (): Promise<CardInformation> => {
        const response = await axiosInstance.get<CardInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    }
}