import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {userAuthenticationService} from "../../http/auth/user/userAuthenticationService.ts";
import type {UserLoginRequest} from "../../../model/auth/user/request/userLoginRequest.ts";

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const search = useSearch({ from: '/login' }) as { redirect?: string };

    return useMutation({
        mutationFn: (values: UserLoginRequest) => userAuthenticationService.login(values),
        onSuccess: async (data) => {
            localStorage.setItem('jwt_token', data.tokenValue);
            const { ...profileData } = data;

            localStorage.setItem('user_profile', JSON.stringify(profileData));
            if (search.redirect) {
                window.location.href = search.redirect;
            } else {
                await navigate({ to: '/' });
            }
        },
    });
};