import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import {companyService} from "../../http/tank/companyService.ts";
import type {UpdateCompanyRequest} from "../../../model/tank/company/updateCompanyRequest.ts";
import type {CompanyResponse} from "../../../model/tank/company/companyResponse.ts";
import type {CreateCompanyRequest} from "../../../model/tank/company/createCompanyRequest.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import type {CompanyItem} from "../../../model/tank/company/companyItem.ts";

export function useCompanyStats() {
    return useQuery<CardInformation>({
        queryKey: ['company', 'stats'],
        queryFn: companyService.getCompanyStats,
        refetchOnWindowFocus: true,
    });
}


export function useCompanyRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<CompanyItem>>({
        queryKey: ['company', 'records', pageIndex, pageSize, pagination.search],
        queryFn: () => companyService.getCompaniesList({ pageIndex, pageSize, search: pagination.search }),
        placeholderData: previousData => previousData
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