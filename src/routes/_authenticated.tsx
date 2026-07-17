import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import {TopNavBar} from "../component/navigation/TopNavBar.tsx";
import {Sidebar} from "../component/navigation/Sidebar.tsx";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: () => (
        <div className="flex min-h-screen bg-background">
            <Sidebar />

            <div className="flex flex-1 flex-col min-h-screen">
                <TopNavBar />

                <main className="flex-1 bg-surface-container-lowest overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    ),
});