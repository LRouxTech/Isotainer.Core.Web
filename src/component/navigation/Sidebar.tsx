import { Link, useNavigate } from '@tanstack/react-router';

export function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate({ to: '/login' });
    };

    const linkActiveProps = {
        className: 'flex items-center gap-3 h-[40px] px-4 rounded bg-primary/10 text-primary font-semibold transition-all'
    };

    const linkInactiveProps = {
        className: 'flex items-center gap-3 h-[40px] px-4 rounded text-on-surface-variant hover:bg-surface-container/10 hover:text-on-surface font-medium transition-all'
    };

    return (
        <aside className="w-[240px] border-r border-outline-variant bg-surface-container-lowest flex flex-col justify-between h-screen sticky top-0 select-none shrink-0">
            <div className="p-4 flex flex-col gap-6">

                <div className="px-4">
                    <h2 className="text-base font-bold text-primary tracking-tight">ISO-Logistics</h2>
                    <p className="text-[11px] font-bold tracking-wider text-outline uppercase mt-0.5">Tank Management</p>
                </div>

                <nav className="flex flex-col gap-1.5">
                    <Link
                        to="/"
                        activeProps={linkActiveProps}
                        inactiveProps={linkInactiveProps}
                        activeOptions={{ exact: true }}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="7" height="9" />
                            <rect x="14" y="3" width="7" height="5" />
                            <rect x="14" y="12" width="7" height="9" />
                            <rect x="3" y="16" width="7" height="5" />
                        </svg>
                        <span className="text-sm">Dashboard</span>
                    </Link>

                    <Link
                        to="/washing"
                        activeProps={linkActiveProps}
                        inactiveProps={linkInactiveProps}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                        <span className="text-sm">Washing</span>
                    </Link>

                    <Link
                        to="/financials"
                        activeProps={linkActiveProps}
                        inactiveProps={linkInactiveProps}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span className="text-sm">Financials</span>
                    </Link>
                </nav>
            </div>

            <div className="p-4 border-t border-outline-variant">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 h-[40px] px-4 rounded text-error hover:bg-error-container/20 font-medium transition-all focus:outline-none"
                >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span className="text-sm">Logout</span>
                </button>
            </div>

        </aside>
    );
}