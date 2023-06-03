export enum UserSystemState {
    Created, //Created but not yet validated
    Active, //Created and validated
    Inactive, //Has been inactive for some time
    Terminated //Has deleted its account
}