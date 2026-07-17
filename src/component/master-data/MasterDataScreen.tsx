import React from 'react';
import {Link} from "@tanstack/react-router";

interface MasterDataItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    count: number;
    lastUpdated: string;
}

export function MasterDataScreen() {
    const masterDataItems: MasterDataItem[] = [
        {
            id: 'general-cost',
            title: 'General Cost',
            description: 'Configure standard pricing templates, logistics cost matrices, and flat overhead service fees.',
            count: 14,
            lastUpdated: '2 hours ago',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            ),
        },
        {
            id: 'company',
            title: 'Company',
            description: 'Manage partner records, carrier clients, active industrial contractors, and billing configurations.',
            count: 48,
            lastUpdated: 'Yesterday',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
            ),
        },
        {
            id: 'wash-type',
            title: 'Wash Type',
            description: 'Define chemical treatment presets, tank wash classifications, temperatures, and cleaning durations.',
            count: 8,
            lastUpdated: 'Jul 12, 2026',
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div>
                <h1 className="text-2xl font-bold text-primary">Master Data Registry</h1>
                <p className="text-sm text-on-surface-variant mt-1">
                    Configure core operational constants, billing structures, and classification schemas for ISO logistics.
                </p>
            </div>

            <hr className="border-outline-variant" />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {masterDataItems.map((item) => (
                    <Link
                        key={item.id}
                        to={`/master-data/${item.id}`}
                        className="group relative flex flex-col justify-between rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 cursor-pointer text-left"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-bold tracking-wide text-outline bg-surface-container px-2.5 py-1 rounded-full uppercase">
                  {item.count} Records
                </span>
                            </div>

                            <h2 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                                {item.title}
                            </h2>
                            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs text-outline font-medium">
                            <span>Updated {item.lastUpdated}</span>
                            <span className="flex items-center gap-1 text-primary font-bold group-hover:translate-x-1 transition-transform">
                Configure
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}