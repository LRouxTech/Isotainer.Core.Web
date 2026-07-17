import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router';
import type {RouterAuthContext} from "../service/types/routerContext.ts";

export const Route = createRootRouteWithContext<RouterAuthContext>()({
    component: () => (
        <>
            <Outlet />
        </>
    ),
    notFoundComponent: () => {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center select-none">
                <h1 className="text-4xl font-bold text-primary">404</h1>
                <p className="mt-2 text-base text-on-surface-variant font-medium">
                    The requested system log or page does not exist.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-flex h-[36px] items-center justify-center rounded bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary/90 transition-colors"
                >
                    Return to Dashboard
                </Link>
            </div>
        );
    },
});