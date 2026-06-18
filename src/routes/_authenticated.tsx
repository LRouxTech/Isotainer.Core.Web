import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context, location }) => {
        // Startup state check: If not logged in, intercept and send to login
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    // Captures where they tried to go so you can route them back after logging in
                    redirect: location.href,
                },
            });
        }
    },
    component: () => (
        <div className="flex min-h-screen bg-background">
            {/* Your future authenticated Sidebar / Navigation Header goes here */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    ),
});