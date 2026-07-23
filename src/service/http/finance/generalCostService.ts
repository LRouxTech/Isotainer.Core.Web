import axiosInstance from "../../../api/axiosInstance.ts";
import type {GeneralCostListResponse} from "../../../model/finance/generalCost/generalCostListResponse.ts";
import type {GeneralCostUpdateResponse} from "../../../model/finance/generalCost/generalCostUpdateResponse.ts";
import type {UpdateGeneralCostRequest} from "../../../model/finance/generalCost/updateGeneralCostRequest.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";

const API_BASE_URL = '/api/finance/generalcost';

export const generalCostService = {
    getGeneralCostList: async (): Promise<GeneralCostListResponse> => {
        const response = await axiosInstance.get<GeneralCostListResponse>(`${API_BASE_URL}/`);
        return response.data;
    },

    updateGeneralCost: async (request: UpdateGeneralCostRequest, id: string): Promise<GeneralCostUpdateResponse> => {
        const response = await axiosInstance.put<GeneralCostUpdateResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    getGeneralCostStats: async (): Promise<CardInformation> => {
        const response = await axiosInstance.get<CardInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    }
}