import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/washing')({
    component: () => (
        <div>
            <h1 className="text-2xl font-bold text-primary">Washing Screen</h1>
            <p className="text-on-surface-variant mt-2">Washing logs and clean queues are managed here.</p>
        </div>
    ),
});