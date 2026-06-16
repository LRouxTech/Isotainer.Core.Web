export interface PermissionListResponse {
    permissionItems : Array<PermissionItem>;
}

export interface PermissionItem {
    id : string; // guid
    section : string;
    permissionName : string;
}