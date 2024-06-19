export interface ListDialogInterface {
    cancelButtonLabel: string;
    confirmButtonLabel: string;
    dialogHeader: string;
    dialogList: Array<any>;
    callbackConfirm?: (selected: any | null) => Function | void;
    callbackCancel?: () => Function | void;
}