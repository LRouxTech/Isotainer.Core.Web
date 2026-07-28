import {useQuery} from "@tanstack/react-query";
import type {RoleListResponse} from "../../../model/auth/role/roleListResponse.ts";
import {roleService} from "../../http/auth/role/roleService.ts";

export function useRoleRecords() {

    return useQuery<RoleListResponse>({
        queryKey: ['role', 'records'],
        queryFn: () => roleService.getRoles(),
        placeholderData: previousData => previousData
    });
}