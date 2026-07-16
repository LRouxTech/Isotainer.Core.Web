import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/financials')({
    component: () => (
        <div>
            <h1 className="text-2xl font-bold text-primary">Financials Screen</h1>
            <p className="text-on-surface-variant mt-2">Operational billing and invoices overview are displayed here.</p>
        </div>
    ),
});