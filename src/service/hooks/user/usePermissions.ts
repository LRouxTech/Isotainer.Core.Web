import {useQuery} from "@tanstack/react-query";
import type {PermissionListResponse} from "../../../model/auth/permission/permissionListResponse.ts";
import {permissionService} from "../../http/auth/permission/permissionService.ts";

export function usePermissionRecords() {

    return useQuery<PermissionListResponse>({
        queryKey: ['permission', 'records'],
        queryFn: () => permissionService.getPermissions(),
        placeholderData: previousData => previousData
    });
}