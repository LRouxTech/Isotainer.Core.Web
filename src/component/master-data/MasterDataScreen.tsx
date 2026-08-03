import React from 'react';
import {Link} from "@tanstack/react-router";
import {useCompanyStats} from "../../service/hooks/tank/useCompany.ts";
import {useWashTypeStats} from "../../service/hooks/wash/useWashType.ts";

interface MasterDataItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    count: number | string;
    isLoading: boolean;
    lastUpdated: string;
}

export function MasterDataScreen() {

    const { data: companyStats, isLoading: isCompanyLoading, isError: isCompanyError } = useCompanyStats();
    const { data: washTypeStats, isLoading: isWashTypeLoading, isError: isWashTypeError } = useWashTypeStats();

    const masterDataItems: MasterDataItem[] = [
        {
            id: 'company',
            title: 'Company',
            description: 'Manage partner records, carrier clients, active industrial contractors, and billing configurations.',
            count: isCompanyLoading ? '...' : isCompanyError ? 0 : companyStats?.recordCount ?? 0,
            lastUpdated: isCompanyLoading ? 'Loading...' : isCompanyError ? 'Unavailable' : companyStats?.lastUpdated ?? 'Never',
            isLoading: isCompanyLoading,
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
            count: isWashTypeLoading ? '...' : isWashTypeError ? 0 : washTypeStats?.recordCount ?? 0,
            lastUpdated: isWashTypeLoading ? 'Loading...' : isWashTypeError ? 'Unavailable' : washTypeStats?.lastUpdated ?? 'Never',
            isLoading: isWashTypeLoading,
            icon: (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-primary">Master Data Registry</h1>
                <p className="text-sm text-on-surface-variant mt-1">
                    Configure core operational constants, billing structures, and classification schemas for ISO logistics.
                </p>
            </div>

            <hr className="border-outline-variant"/>

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

                                {item.isLoading && item.id === 'general-cost' ? (
                                    <div className="h-6 w-20 bg-surface-container rounded-full animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold tracking-wide text-outline bg-surface-container px-2.5 py-1 rounded-full uppercase">
                    {item.count} {item.count === 1 ? 'Record' : 'Records'}
                  </span>
                                )}
                            </div>

                            <h2 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                                {item.title}
                            </h2>
                            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs text-outline font-medium">
                            {item.isLoading && item.id === 'general-cost' ? (
                                <div className="h-4 w-28 bg-surface-container rounded animate-pulse" />
                            ) : (
                                <span>Updated {item.lastUpdated}</span>
                            )}

                            <span className="flex items-center gap-1 text-primary font-bold group-hover:translate-x-1 transition-transform">
                Configure
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}