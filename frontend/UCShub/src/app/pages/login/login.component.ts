import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerCenterComponent } from '../../../components/containers/container-center.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormValidations } from '../../../utils/form-validations';
import { StorageService } from '../../db/storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { User } from '../../models/User';
import { Person } from '../../models/Person';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialog } from '../user/user-signup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    ContainerCenterComponent, 
    MatButtonModule, 
    MatInputModule, 
    SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  storage: StorageService = inject(StorageService);
  api: ApiService = inject(ApiService);
  router: Router = new Router();
  dialog: MatDialog = inject(MatDialog);

  hideSenha: boolean = true;
  isLoading: boolean = false;

  formulario!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })

  }

  onSubmit(){
    if (FormValidations.checkValidity(this.formulario)){
      let u : User = this.formulario.value 
      this.isLoading = true
     

      this.api.Login(u).subscribe(async resp => {

        if (resp && resp.success){
          this.storage.SaveLoggedUser(resp.user)
          this.storage.SaveAuth(this.api.getAuth(u.email, u.password))
          this.router.navigate(['home']);
          this.isLoading = false
        }

        this.isLoading = false
      })
    }

  }

  abrirSignup(){
    const dialogRef = this.dialog.open(SignupDialog, {
      data: this.formulario.value,
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.formulario.patchValue(result);
      }

    });
  }

  getErrorMessage(campoName: string, campo: string) {
    return FormValidations.getErrorMessage(campoName, campo, this.formulario);
  }

}
