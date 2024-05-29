export interface TableColumn {
    name: string;
    concatData?: boolean;
    concatChar?: string;
    concatDataKey?: string;
    dataKey?: string;
    pipe?: 'date' | 'decimal' | 'currency' | 'percent' | 'upperCase' | 'lowerCase' | 'mask';
    pipeFormat?: string; // for currency, percent and decimal use it for decimal digits
    position?: 'right' | 'left';
    isSortable?: boolean;
    hybrid?: boolean;
    hybridName?: string;
    enumColumn?: boolean;
    enumValue?: any;
    booleanColumn?: boolean;

}