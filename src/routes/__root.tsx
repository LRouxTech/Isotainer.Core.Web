import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type {RouterAuthContext} from "../service/types/routerContext.ts";

export const Route = createRootRouteWithContext<RouterAuthContext>()({
    component: () => (
        <>
            {/* Global layouts like snackbars, toasts, or top loading bars go here */}
            <Outlet />
        </>
    ),
});