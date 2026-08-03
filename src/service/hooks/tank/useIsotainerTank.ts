import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import {isotainerTankService} from "../../http/tank/isotainerTankService.ts";
import type {IsotainerTankItem} from "../../../model/tank/isotainerTank/isotainerTankListResponse.ts";
import type {IsotainerTankResponse} from "../../../model/tank/isotainerTank/isotainerTankResponse.ts";
import type {CreateIsotainerTankRequest} from "../../../model/tank/isotainerTank/createIsotainerTankRequest.ts";
import type {UpdateIsotainerTankRequest} from "../../../model/tank/isotainerTank/updateIsotainerTankRequest.ts";
import type {ChangeWashStatusRequest} from "../../../model/tank/isotainerTank/changeWashStatusRequest.ts";
import type {TankStatisticInformation} from "../../../model/tank/isotainerTank/tankStatisticInformation.ts";

export function useIsotainerTankRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<IsotainerTankItem>>({
        queryKey: ['isotainerTank', 'records', pageIndex, pageSize, pagination.search],
        queryFn: () => isotainerTankService.getIsotainerTankList({ pageIndex, pageSize, search: pagination.search }),
        placeholderData: previousData => previousData
    });
}

export function useCreateIsotainerTank() {
    const queryClient = useQueryClient();

    return useMutation<IsotainerTankResponse, Error, CreateIsotainerTankRequest>({
        mutationFn: (request) => isotainerTankService.createIsotainerTank(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isotainerTank', 'records'] });
        },
    });
}

interface UpdateIsotainerTankParams {
    id: string;
    request: UpdateIsotainerTankRequest;
}

export function useUpdateIsotainerTank() {
    const queryClient = useQueryClient();

    return useMutation<IsotainerTankResponse, Error, UpdateIsotainerTankParams>({
        mutationFn: ({ id, request }) => isotainerTankService.updateIsotainerTank(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isotainerTank', 'records'] });
        },
    });
}

interface ChangeWashStatusRequestParams {
    id: string;
    request: ChangeWashStatusRequest;
}

export function useChangeIsotainerTankWashStatus() {
    const queryClient = useQueryClient();

    return useMutation<IsotainerTankResponse, Error, ChangeWashStatusRequestParams>({
        mutationFn: ({ id, request }) => isotainerTankService.changeIsotainerTankWashStatus(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isotainerTank', 'records'] });
        },
    });
}

export function useUnloadIsotainerTank() {
    const queryClient = useQueryClient();

    return useMutation<IsotainerTankResponse, Error, string>({
        mutationFn: (id) => isotainerTankService.unloadIsotainerTank(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isotainerTank', 'records'] });
        },
    });
}


export function useDeleteIsotainerTank() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: (id) => isotainerTankService.deleteIsotainerTank(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isotainerTank', 'records'] });
        },
    });
}

export function useIsotainerTankStats() {
    return useQuery<TankStatisticInformation>({
        queryKey: ['isotainerTank', 'stats' ],
        queryFn: () => isotainerTankService.getIsotainerTankStats(),
        placeholderData: previousData => previousData
    });
}