import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {generalCostService} from "../../http/finance/generalCostService.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {
    GeneralCostItem,
} from "../../../model/finance/generalCost/generalCostListResponse.ts";
import type {GeneralCostUpdateResponse} from "../../../model/finance/generalCost/generalCostUpdateResponse.ts";
import type {UpdateGeneralCostRequest} from "../../../model/finance/generalCost/updateGeneralCostRequest.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";

export function useGeneralCostStats() {
    return useQuery<CardInformation>({
        queryKey: ['generalCost', 'stats'],
        queryFn: generalCostService.getGeneralCostStats,
        refetchOnWindowFocus: true,
    });
}

export function useGeneralCostRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<GeneralCostItem>>({
        queryKey: ['generalCost', 'records', pageIndex, pageSize],
        queryFn: () => generalCostService.getGeneralCostList({ pageIndex, pageSize }),
        placeholderData: previousData => previousData
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