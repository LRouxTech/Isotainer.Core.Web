export interface UpdatePasswordRequest {
    token : string;
    newPassword : string;
    newPasswordConfirm : string;
}