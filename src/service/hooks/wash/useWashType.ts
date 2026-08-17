import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import {washTypeService} from "../../http/wash/washTypeService.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import type {WashTypeItem} from "../../../model/wash/washType/washTypeListResponse.ts";
import type {WashTypeResponse} from "../../../model/wash/washType/washTypeResponse.ts";
import type {CreateWashTypeRequest} from "../../../model/wash/washType/createWashTypeRequest.ts";
import type {UpdateWashTypeRequest} from "../../../model/wash/washType/updateWashTypeRequest.ts";

export function useWashTypeStats() {
    return useQuery<CardInformation>({
        queryKey: ['washType', 'stats'],
        queryFn: washTypeService.getWashTypeStats,
        refetchOnWindowFocus: true,
    });
}


export function useWashTypeRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<WashTypeItem>>({
        queryKey: ['washType', 'records', pageIndex, pageSize, pagination.search],
        queryFn: () => washTypeService.getWashTypesList({ pageIndex, pageSize, search: pagination.search }),
        placeholderData: previousData => previousData
    });
}

export function useCreateWashType() {
    const queryClient = useQueryClient();

    return useMutation<WashTypeResponse, Error, CreateWashTypeRequest>({
        mutationFn: (request) => washTypeService.createWashType(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washType', 'records'] });
        },
    });
}

interface UpdateWashTypeParams {
    id: string;
    request: UpdateWashTypeRequest;
}

export function useUpdateWashType() {
    const queryClient = useQueryClient();

    return useMutation<WashTypeResponse, Error, UpdateWashTypeParams>({
        mutationFn: ({ id, request }) => washTypeService.updateWashType(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washType', 'records'] });
        },
    });
}

export function useDeleteWashType() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: (id) => washTypeService.deleteWashType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washType', 'records'] });
        },
    });
}