import {useQuery} from "@tanstack/react-query";
import type {CardInformation} from "../../../model/general/cardInformation.ts";
import {companyService} from "../../http/tank/companyService.ts";

export function useCompanyStats() {
    return useQuery<CardInformation>({
        queryKey: ['company', 'stats'],
        queryFn: companyService.getCompanyStats,
        refetchOnWindowFocus: true,
    });
}