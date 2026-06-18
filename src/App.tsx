import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createRouter({
    routeTree,
    context: {
        auth: undefined!,
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function RouterWrapper() {
    const hasToken = !!localStorage.getItem('jwt_token');

    return (
        <RouterProvider
            router={router}
            context={{
                auth: { isAuthenticated: hasToken }
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