import axiosInstance from "../../../api/axiosInstance.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {CompanyListResponse} from "../../../model/tank/company/companyListResponse.ts";
import type {CreateCompanyRequest} from "../../../model/tank/company/createCompanyRequest.ts";
import type {CompanyResponse} from "../../../model/tank/company/companyResponse.ts";
import type {UpdateCompanyRequest} from "../../../model/tank/company/updateCompanyRequest.ts";

const API_BASE_URL = '/api/tank/company';

export const companyService = {
    getCompaniesList: async (): Promise<CompanyListResponse> => {
        const response = await axiosInstance.get<CompanyListResponse>(`${API_BASE_URL}/`);
        return response.data;
    },

    createCompany: async (request: CreateCompanyRequest): Promise<CompanyResponse> => {
        const response = await axiosInstance.post<CompanyResponse>(`${API_BASE_URL}/`, request);
        return response.data;
    },

    updateCompany: async (request: UpdateCompanyRequest, id : number): Promise<CompanyResponse> => {
        const response = await axiosInstance.put<CompanyResponse>(`${API_BASE_URL}/${id}`, request);
        return response.data;
    },

    deleteCompany: async (id : number): Promise<boolean> => {
        const response = await axiosInstance.delete<boolean>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    getCompanyStats: async (): Promise<CardInformation> => {
        const response = await axiosInstance.get<CardInformation>(`${API_BASE_URL}/stats`);
        return response.data;
    }
}