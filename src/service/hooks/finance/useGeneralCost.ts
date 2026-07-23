import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {generalCostService} from "../../http/finance/generalCostService.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {GeneralCostListResponse} from "../../../model/finance/generalCost/generalCostListResponse.ts";
import type {GeneralCostUpdateResponse} from "../../../model/finance/generalCost/generalCostUpdateResponse.ts";
import type {UpdateGeneralCostRequest} from "../../../model/finance/generalCost/updateGeneralCostRequest.ts";

export function useGeneralCostStats() {
    return useQuery<CardInformation>({
        queryKey: ['generalCost', 'stats'],
        queryFn: generalCostService.getGeneralCostStats,
        refetchOnWindowFocus: true,
    });
}

export function useGeneralCostRecords() {
    return useQuery<GeneralCostListResponse>({
        queryKey: ['generalCost', 'records'],
        queryFn: generalCostService.getGeneralCostList
    });
}

interface UpdateGeneralCostParams {
    id: string;
    request: UpdateGeneralCostRequest;
}

export function useUpdateGeneralCost() {
    const queryClient = useQueryClient();

    return useMutation<GeneralCostUpdateResponse, Error, UpdateGeneralCostParams>({
        mutationFn: ({ id, request }) => generalCostService.updateGeneralCost(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['generalCost', 'records'] });
        },
    });
}