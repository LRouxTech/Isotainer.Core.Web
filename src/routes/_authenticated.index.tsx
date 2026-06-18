import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
    component: () => (
        <div className="text-on-background">
            <h1 className="text-2xl font-bold text-primary">Welcome to ISO-Master</h1>
            <p className="text-on-surface-variant mt-2">You are securely authenticated.</p>
        </div>
    ),
});