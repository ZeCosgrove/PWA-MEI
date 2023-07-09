export enum UserSystemState {
  Created = 0, //Created but not yet validated
  Active = 1, //Created and validated
  Inactive = 2, //Has been inactive for some time
  Terminated = 3, //Has deleted its account
}
