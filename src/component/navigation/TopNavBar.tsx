import { Link } from '@tanstack/react-router';

export function TopNavBar() {
    return (
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6">

            {/* Left Section: Title & Global Search */}
            <div className="flex items-center gap-6 flex-1 max-w-xl">
        <span className="text-xl font-bold tracking-tight text-primary select-none">
          ISO-Master
        </span>

                {/* Global Elasticsearch Mock Input */}
                <div className="relative w-full max-w-[320px] h-[36px]">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-outline">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
                    <input
                        type="text"
                        placeholder="Global Search..."
                        disabled
                        className="w-full h-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-3 text-sm text-on-surface placeholder:text-outline/70 focus:outline-none cursor-not-allowed opacity-80"
                    />
                </div>
            </div>

            {/* Middle Section: Navigation Links */}
            <nav className="flex items-center gap-6 mx-4">
                {/* Dynamic active-state link to the Master Data screen */}
                <Link
                    to="/master-data"
                    activeProps={{ className: 'text-primary font-bold border-b-2 border-primary pb-1' }}
                    inactiveProps={{ className: 'text-on-surface-variant hover:text-on-surface font-medium transition-colors' }}
                    className="text-sm tracking-wide"
                >
                    Master Data
                </Link>

                {/* Static Unused Buttons */}
                <span className="text-sm font-medium text-on-surface-variant/40 cursor-not-allowed select-none">
          Reports
        </span>
                <span className="text-sm font-medium text-on-surface-variant/40 cursor-not-allowed select-none">
          Inventory
        </span>
            </nav>

            {/* Right Section: Actions, Icons & Profile */}
            <div className="flex items-center gap-4">

                {/* Quick Action Mock Button */}
                <button
                    disabled
                    className="h-[36px] px-4 rounded bg-primary text-sm font-semibold text-on-primary opacity-90 cursor-not-allowed"
                >
                    Quick Action
                </button>

                {/* Spirit Icons: Alert Notification */}
                <button
                    title="Alerts (Not Implemented)"
                    className="p-2 text-on-surface-variant hover:bg-surface-container/10 rounded transition-colors cursor-not-allowed opacity-60"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>

                {/* Spirit Icons: Activity History */}
                <button
                    title="History (Not Implemented)"
                    className="p-2 text-on-surface-variant hover:bg-surface-container/10 rounded transition-colors cursor-not-allowed opacity-60"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                </button>

                {/* Profile Avatar */}
                <div className="h-9 w-9 overflow-hidden rounded-full border border-outline-variant bg-surface-container">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                        alt="Default User Avatar"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
}