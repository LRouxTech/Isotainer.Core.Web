import axiosInstance from "../../../api/axiosInstance.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {CreateCompanyRequest} from "../../../model/tank/company/createCompanyRequest.ts";
import type {CompanyResponse} from "../../../model/tank/company/companyResponse.ts";
import type {UpdateCompanyRequest} from "../../../model/tank/company/updateCompanyRequest.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import type {CompanyItem} from "../../../model/tank/company/companyItem.ts";

const API_BASE_URL = '/api/tank/company';

export const companyService = {
    getCompaniesList: async (pagination : PagedRequest): Promise<PagedList<CompanyItem>> => {
        const response = await axiosInstance.get<PagedList<CompanyItem>>(`${API_BASE_URL}/`, {
            params: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                search: pagination.search
            },
        });
        return response.data;
    },

    createCompany: async (request: CreateCompanyRequest): Promise<CompanyResponse> => {
        const response = await axiosInstance.post<CompanyResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateCompany: async (request: UpdateCompanyRequest, id : string): Promise<CompanyResponse> => {
        const response = await axiosInstance.put<CompanyResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    deleteCompany: async (id : string): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    getCompanyStats: async (): Promise<CardInformation> => {
        const response = await axiosInstance.get<CardInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    }
}