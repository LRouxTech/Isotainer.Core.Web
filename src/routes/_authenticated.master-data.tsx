import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/master-data')({
    component: () => <Outlet />, // This allows sub-routes to render cleanly!
});