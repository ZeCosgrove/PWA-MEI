export enum ShoppingCartSystemState {
    Active = 1, // First Product has been added
    Aborted = 2, // User canceled the current cart
    Abandoned = 3, // User closed the app and has not returned for x time
    Terminated = 4 // User has completed his purchase
}