import {createRouter, RouterProvider} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen.ts';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./QueryClient.tsx";
import {useCurrentUser} from "./service/hooks/auth/useCurrentUser.tsx";

const router = createRouter({
    routeTree,
    context: {
        auth: { isAuthenticated: false },
    },
});

function RouterWrapper() {
    const user = useCurrentUser();
    const hasToken = localStorage.getItem('jwt_token');

    const isAuthenticated = Boolean(hasToken && user);

    return (
        <RouterProvider
            router={router}
            context={{
                auth: { isAuthenticated: isAuthenticated }
            }}
        />
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterWrapper />
        </QueryClientProvider>
    );
}