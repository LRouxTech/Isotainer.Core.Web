import { useQuery } from '@tanstack/react-query';
import {permissionService} from "../../../http/auth/permission/permissionService.ts";

export const usePermissions = () => {
    return useQuery({
        queryKey: ['permissions'],
        queryFn: permissionService.getPermissions,
        retry: false
    });
};