import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../tableColumn';
import { CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, PercentPipe, UpperCasePipe } from '@angular/common';

@Pipe({
    name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

    transform(object: any, tableColumn: TableColumn, checkConcat: boolean = true) {
        let keyName = tableColumn.dataKey;
        let originalObject = object;

        if (keyName!.includes(".")) {
            let keys = keyName!.split(".")
            for (let i = 0; i < keys.length - 1; i++) {
                object ? object = object[keys[i]] : null;
            }
            keyName = keys[keys.length - 1]
        }

        let retColumn = object ? object[keyName!] : null;
        
        if (checkConcat && tableColumn.concatData) {
            const tableColumnOriginal = tableColumn.dataKey

            tableColumn.dataKey = tableColumn.concatDataKey
            retColumn += tableColumn.concatChar + this.transform(originalObject, tableColumn, false)
                        
            tableColumn.dataKey = tableColumnOriginal
        }

        if (tableColumn.pipe) {
            switch (tableColumn.pipe) {
                case 'date':
                    let dPipe = new DatePipe('pt-BR');
                    return dPipe.transform(retColumn, tableColumn.pipeFormat);
                case 'currency':
                    let cPipe = new CurrencyPipe('pt-BR');
                    return cPipe.transform(retColumn, 'BRL', "symbol", tableColumn.pipeFormat);
                case 'decimal':
                    let decPipe = new DecimalPipe('pt-BR');
                    return decPipe.transform(retColumn, tableColumn.pipeFormat);
                case 'percent':
                    let pPipe = new PercentPipe('pt-BR');
                    return pPipe.transform(retColumn, tableColumn.pipeFormat);
                case 'upperCase':
                    let uPipe = new UpperCasePipe();
                    return uPipe.transform(retColumn);
                case 'lowerCase':
                    let lPipe = new LowerCasePipe();
                    return lPipe.transform(retColumn);
                case 'mask':
                    if (!retColumn) {
                        return null;
                    }

                    let unFormatted: string = retColumn;
                    let formatted: string = '';

                    for (let i = 0; i < tableColumn.pipeFormat!.length; i++) {
                        if (tableColumn.pipeFormat!.charAt(i) === '0') {
                            formatted += unFormatted.charAt(0);
                            unFormatted = unFormatted.slice(1)
                        } else {
                            formatted += tableColumn.pipeFormat!.charAt(i)
                        }
                    }
                    return formatted;
                default:
                    break;
            }
        }

        return retColumn;
    }

}