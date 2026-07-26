import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {WashInstructionItem} from "../../../model/wash/washInstruction/washInstructionsListResponse.ts";
import {washInstructionService} from "../../http/wash/washInstructionService.ts";
import type {CreateWashInstructionRequest} from "../../../model/wash/washInstruction/createWashInstructionRequest.ts";
import type {WashInstructionResponse} from "../../../model/wash/washInstruction/washInstructionResponse.ts";
import type {UpdateWashInstructionRequest} from "../../../model/wash/washInstruction/updateWashInstructionRequest.ts";

export function useWashInstructionRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<WashInstructionItem>>({
        queryKey: ['washInstruction', 'records', pageIndex, pageSize],
        queryFn: () => washInstructionService.getWashInstructionList({ pageIndex, pageSize }),
        placeholderData: previousData => previousData
    });
}

export function useCreateWashInstruction() {
    const queryClient = useQueryClient();

    return useMutation<WashInstructionResponse, Error, CreateWashInstructionRequest>({
        mutationFn: (request) => washInstructionService.createWashInstruction(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washInstruction', 'records'] });
        },
    });
}

interface UpdateWashInstructionParams {
    id: string;
    request: UpdateWashInstructionRequest;
}

export function useUpdateWashInstruction() {
    const queryClient = useQueryClient();

    return useMutation<WashInstructionResponse, Error, UpdateWashInstructionParams>({
        mutationFn: ({ id, request }) => washInstructionService.updateWashInstruction(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washInstruction', 'records'] });
        },
    });
}

export function useDeleteWashInstruction() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, string>({
        mutationFn: (id) => washInstructionService.deleteWashInstruction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['washInstruction', 'records'] });
        },
    });
}