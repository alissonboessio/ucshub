import { EventEmitter, Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StorageService } from '../db/storage.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class RotinaService {

  Api: ApiService = inject(ApiService)
  storage: StorageService = inject(StorageService)
  snackBar: MatSnackBar = inject(MatSnackBar)

  async LogOf() {
      await this.storage.ClearStorage();

  }

  async showMensagem(codErro: number | null = null, mensagemErro: string | null = null, toastType: string, msgToast: string, horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'top') {

      if (codErro) {
      }

      this.snackBar.open(msgToast, 'Ok', {
          horizontalPosition: horizontalPosition,
          verticalPosition: verticalPosition,
          duration: 3000,
          panelClass: [`${toastType}-snackbar`, 'login-snackbar'],
      });
  }
}
