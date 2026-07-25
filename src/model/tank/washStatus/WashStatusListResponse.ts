export interface WashStatusListResponse {
    items : Array<WashStatusItem>
}

export interface WashStatusItem {
    washStatusId : string; // guid
    type : number;
}

// 1. Define the values as a const object
export const WashStatusType = {
    New: 1,
    Booked: 2,
    Clean: 3,
} as const;

// 2. Extract the type union (1 | 2 | 3)
export type WashStatusType = typeof WashStatusType[keyof typeof WashStatusType];

// 3. Your config map remains unchanged and type-safe!
export const WASH_STATUS_CONFIG: Record<WashStatusType, { label: string; badgeClass: string }> = {
    [WashStatusType.New]: {
        label: 'New',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    [WashStatusType.Booked]: {
        label: 'Booked',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    [WashStatusType.Clean]: {
        label: 'Clean',
        badgeClass: 'bg-green-100 text-green-800 border-green-200',
    },
};