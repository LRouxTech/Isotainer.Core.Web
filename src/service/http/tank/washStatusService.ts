import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import axiosInstance from "../../../api/axiosInstance.ts";
import type {WashStatusItem} from "../../../model/tank/washStatus/WashStatusListResponse.ts";

const API_BASE_URL = '/api/tank/washstatus';

export const washStatusService = {
    getWashStatusList: async (pagination: PagedRequest): Promise<PagedList<WashStatusItem>> => {
        const response = await axiosInstance.get<PagedList<WashStatusItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
        return response.data;
    }
}