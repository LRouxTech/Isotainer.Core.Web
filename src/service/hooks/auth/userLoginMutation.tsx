import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {userAuthenticationService} from "../../http/auth/user/userAuthenticationService.ts";
import type {UserLoginRequest} from "../../../model/auth/user/request/userLoginRequest.ts";

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const search = useSearch({ from: '/login' }) as { redirect?: string };

    return useMutation({
        mutationFn: (values: UserLoginRequest) => userAuthenticationService.login(values),
        onSuccess: (data) => {
            localStorage.setItem('jwt_token', data.tokenValue);

            // Force instant window redirect or router push back to secure dashboard
            if (search.redirect) {
                window.location.href = search.redirect;
            } else {
                navigate({ to: '/' });
            }
        },
    });
};