import axiosInstance from "../../../api/axiosInstance.ts";
import type {GeneralCostListResponse} from "../../../model/finance/generalCost/generalCostListResponse.ts";
import type {GeneralCostUpdateResponse} from "../../../model/finance/generalCost/generalCostUpdateResponse.ts";
import type {UpdateGeneralCostRequest} from "../../../model/finance/generalCost/updateGeneralCostRequest.ts";

const API_BASE_URL = '/api/finance/generalcost';

export const generalCostService = {
    getGeneralCostList: async (): Promise<GeneralCostListResponse> => {
        const response = await axiosInstance.post<GeneralCostListResponse>(`${API_BASE_URL}/`);
        return response.data;
    },

    updateGeneralCost: async (request: UpdateGeneralCostRequest): Promise<GeneralCostUpdateResponse> => {
        const response = await axiosInstance.put<GeneralCostUpdateResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    }
}