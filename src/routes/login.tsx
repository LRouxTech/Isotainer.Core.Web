import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPageComponent } from '../component/auth/loginPageComponent.tsx'

export const Route = createFileRoute('/login')({
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: '/' });
        }
    },
    component: LoginPageComponent,
});

