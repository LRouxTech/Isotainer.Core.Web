import {useQuery} from "@tanstack/react-query";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import {washTypeService} from "../../http/wash/washTypeService.ts";

export function useWashTypeStats() {
    return useQuery<CardInformation>({
        queryKey: ['washType', 'stats'],
        queryFn: washTypeService.getWashTypeStats,
        refetchOnWindowFocus: true,
    });
}