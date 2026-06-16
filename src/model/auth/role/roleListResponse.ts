export interface RoleListResponse {
    roleItems : Array<RoleItem>;
}

export interface RoleItem {
    id: string; // guid
    name: string;
    description: string;
    permissionIds : Array<string>; // guids
}