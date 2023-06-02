export enum ShoppingCartSystemState {
    Active, // First Product has been added
    Aborted, // User canceled the current cart
    Abandoned, // User closed the app and has not returned for x time
    Terminated // User has completed his purchase
}