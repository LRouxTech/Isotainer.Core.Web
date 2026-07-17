import {useQuery} from "@tanstack/react-query";
import {generalCostService} from "../../http/finance/generalCostService.ts";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import type {GeneralCostListResponse} from "../../../model/finance/generalCost/generalCostListResponse.ts";

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