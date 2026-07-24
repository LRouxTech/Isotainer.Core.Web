import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import {companyService} from "../../http/tank/companyService.ts";
import type {CompanyListResponse} from "../../../model/tank/company/companyListResponse.ts";
import type {UpdateCompanyRequest} from "../../../model/tank/company/updateCompanyRequest.ts";
import type {CompanyResponse} from "../../../model/tank/company/companyResponse.ts";
import type {CreateCompanyRequest} from "../../../model/tank/company/createCompanyRequest.ts";

export function useCompanyStats() {
    return useQuery<CardInformation>({
        queryKey: ['company', 'stats'],
        queryFn: companyService.getCompanyStats,
        refetchOnWindowFocus: true,
    });
}


export function useCompanyRecords() {
    return useQuery<CompanyListResponse>({
        queryKey: ['company', 'records'],
        queryFn: companyService.getCompaniesList
    });
}

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation<CompanyResponse, Error, CreateCompanyRequest>({
        mutationFn: (request) => companyService.createCompany(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company', 'records'] });
        },
    });
}

interface UpdateCompanyParams {
    id: string;
    request: UpdateCompanyRequest;
}

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation<CompanyResponse, Error, UpdateCompanyParams>({
        mutationFn: ({ id, request }) => companyService.updateCompany(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company', 'records'] });
        },
    });
}


export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: (id) => companyService.deleteCompany(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company', 'records'] });
        },
    });
}