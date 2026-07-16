import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import {TopNavBar} from "../component/navigation/TopNavBar.tsx";
import {Sidebar} from "../component/navigation/Sidebar.tsx";

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
        <div className="flex flex-col min-h-screen bg-background">
            <TopNavBar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 bg-surface-container-lowest overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    ),
});