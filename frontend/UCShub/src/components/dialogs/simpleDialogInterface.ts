export interface SimpleDialogInterface {
    cancelButtonLabel: string;
    confirmButtonLabel: string;
    dialogHeader: string;
    dialogContent: string;
    callbackConfirm?: () => Function | void;
    callbackCancel?: () => Function | void;
}