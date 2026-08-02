import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import axiosInstance from "../../../api/axiosInstance.ts";
import type {IsotainerTankItem} from "../../../model/tank/isotainerTank/isotainerTankListResponse.ts";
import type {IsotainerTankResponse} from "../../../model/tank/isotainerTank/isotainerTankResponse.ts";
import type {CreateIsotainerTankRequest} from "../../../model/tank/isotainerTank/createIsotainerTankRequest.ts";
import type {UpdateIsotainerTankRequest} from "../../../model/tank/isotainerTank/updateIsotainerTankRequest.ts";
import type {ChangeWashStatusRequest} from "../../../model/tank/isotainerTank/changeWashStatusRequest.ts";
import type {TankStatisticInformation} from "../../../model/tank/isotainerTank/tankStatisticInformation.ts";

const API_BASE_URL = '/api/tank/isotainer';

export const isotainerTankService = {
    getIsotainerTankList: async (pagination : PagedRequest): Promise<PagedList<IsotainerTankItem>> => {
        const response = await axiosInstance.get<PagedList<IsotainerTankItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
        return response.data;
    },

    createIsotainerTank: async (request: CreateIsotainerTankRequest): Promise<IsotainerTankResponse> => {
        const response = await axiosInstance.post<IsotainerTankResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateIsotainerTank: async (request: UpdateIsotainerTankRequest, id : string): Promise<IsotainerTankResponse> => {
        const response = await axiosInstance.put<IsotainerTankResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    changeIsotainerTankWashStatus: async (request: ChangeWashStatusRequest, id : string): Promise<IsotainerTankResponse> => {
        const response = await axiosInstance.put<IsotainerTankResponse>(`${API_BASE_URL}/${id}/wash-status`, request);
        return response.data;
    },

    unloadIsotainerTank: async (id : string): Promise<IsotainerTankResponse> => {
        const response = await axiosInstance.put<IsotainerTankResponse>(`${API_BASE_URL}/${id}/unload`);
        return response.data;
    },

    deleteIsotainerTank: async (id : string): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    getIsotainerTankStats: async (): Promise<TankStatisticInformation> => {
        const response = await axiosInstance.get<TankStatisticInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    },
}