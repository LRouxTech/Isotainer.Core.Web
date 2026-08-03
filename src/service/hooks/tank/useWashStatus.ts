import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import {useQuery} from "@tanstack/react-query";
import {washStatusService} from "../../http/tank/washStatusService.ts";
import type {WashStatusItem} from "../../../model/tank/washStatus/WashStatusListResponse.ts";

export function useWashStatusRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<WashStatusItem>>({
        queryKey: ['washStatus', 'records', pageIndex, pageSize, pagination.search],
        queryFn: () => washStatusService.getWashStatusList({ pageIndex, pageSize, search: pagination.search }),
        placeholderData: previousData => previousData
    });
}