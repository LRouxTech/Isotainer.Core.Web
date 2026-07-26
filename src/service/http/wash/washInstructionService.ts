import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import axiosInstance from "../../../api/axiosInstance.ts";
import type {WashInstructionItem} from "../../../model/wash/washInstruction/washInstructionsListResponse.ts";
import type {WashInstructionResponse} from "../../../model/wash/washInstruction/washInstructionResponse.ts";
import type {CreateWashInstructionRequest} from "../../../model/wash/washInstruction/createWashInstructionRequest.ts";
import type {UpdateWashInstructionRequest} from "../../../model/wash/washInstruction/updateWashInstructionRequest.ts";

const API_BASE_URL = '/api/wash/instruction';

export const washInstructionService = {
    getWashInstructionList: async (pagination : PagedRequest): Promise<PagedList<WashInstructionItem>> => {
        const response = await axiosInstance.get<PagedList<WashInstructionItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        });
        return response.data;
    },

    createWashInstruction: async (request: CreateWashInstructionRequest): Promise<WashInstructionResponse> => {
        const response = await axiosInstance.post<WashInstructionResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateWashInstruction: async (request: UpdateWashInstructionRequest, id : string): Promise<WashInstructionResponse> => {
        const response = await axiosInstance.put<WashInstructionResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    deleteWashInstruction: async (id : string): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },
}