import axiosInstance from "../../../api/axiosInstance.ts";
import type {
    GeneralCostItem
} from "../../../model/finance/generalCost/generalCostListResponse.ts";
import type {GeneralCostUpdateResponse} from "../../../model/finance/generalCost/generalCostUpdateResponse.ts";
import type {UpdateGeneralCostRequest} from "../../../model/finance/generalCost/updateGeneralCostRequest.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";

const API_BASE_URL = '/api/finance/generalcost';

export const generalCostService = {
    getGeneralCostList: async (pagination : PagedRequest): Promise<PagedList<GeneralCostItem>> => {
        const response = await axiosInstance.get<PagedList<GeneralCostItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
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