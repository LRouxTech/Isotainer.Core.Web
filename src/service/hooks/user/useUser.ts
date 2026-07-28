import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {ListUser, UserListResponse} from "../../../model/auth/user/response/userListResponse.ts";
import {userManagementService} from "../../http/auth/user/userManagementService.ts";
import type {UserDetailRequest} from "../../../model/auth/user/request/userDetailRequest.ts";
import type {UserDetailResponse} from "../../../model/auth/user/response/userDetailResponse.ts";
import type {ArchiveUserRequest} from "../../../model/auth/user/request/archiveUserRequest.ts";
import type {CreateUserRequest} from "../../../model/auth/user/request/createUserRequest.ts";
import type {UpdateUserRequest} from "../../../model/auth/user/request/updateUserRequest.ts";
import type {PagedList, PagedRequest} from "../../../model/general/pagedList.ts";

export function useUserRecords(pagination : PagedRequest) {
    const pageIndex = (pagination?.pageIndex ?? 0) + 1;
    const pageSize = pagination?.pageSize ?? 10;

    return useQuery<PagedList<ListUser>>({
        queryKey: ['user', 'records', pageIndex, pageSize],
        queryFn: () => userManagementService.getUserList({ pageIndex, pageSize }),
        placeholderData: previousData => previousData
    });
}

export function useUserItem(request: UserDetailRequest) {
    return useQuery<UserDetailResponse>({
        queryKey: ['user', 'records', request],
        queryFn: () => userManagementService.getUser(request),
        placeholderData: previousData => previousData
    });
}

export function useArchiveUser() {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, ArchiveUserRequest>({
        mutationFn: (request) => userManagementService.archiveUser(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'records'] });
        },
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation<UserDetailResponse, Error, CreateUserRequest>({
        mutationFn: (request) => userManagementService.createUser(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'records'] });
        },
    });
}

interface UpdateIsotainerTankParams {
    id: string;
    request: UpdateUserRequest;
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation<UserDetailResponse, Error, UpdateIsotainerTankParams>({
        mutationFn: ({ id, request }) => userManagementService.updateUser(request, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'records'] });
        },
    });
}