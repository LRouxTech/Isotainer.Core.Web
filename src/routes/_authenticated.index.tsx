// src/routes/_authenticated.index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
    beforeLoad: () => {
        // Automatically forwards the user from "/" to "/home"
        throw redirect({ to: '/home' });
    },
});