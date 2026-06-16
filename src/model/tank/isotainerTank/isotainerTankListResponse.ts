export interface IsotainerTankListResponse {
    isotainerTankItems : Array<IsotainerTankItem>
}

export interface IsotainerTankItem {
    isotainerTankId : string; // guid
    tankNumber : string;
    companyId : string; // guid
    washStatusId : string; // guid
    loadedOn : string;
    unloadedOn : string;
}