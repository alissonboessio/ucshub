import { Component, Inject } from '@angular/core';
import { ContainerOverflowComponent } from '../../../../components/containers/containerOverflow/container-overflow.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Production } from '../../../models/Production';
import { Person } from '../../../models/Person';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/Project';
import { Instituiton } from '../../../models/Instituition';
import { FormValidations } from '../../../../utils/form-validations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Enum_ProductionType from '../../../models/enumerations/Enum_ProductionType.json';
import {MatSelectModule} from '@angular/material/select';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm.component';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [ContainerOverflowComponent, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule,
    CancelConfirmComponent ],
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {

    public form!: FormGroup; 
    formBuilder: FormBuilder = new FormBuilder();
    public production : Production = new Production();
    enumTypes: any = Enum_ProductionType;
    formattedEnumTypes! : string[] | null;

    projects: Project[] = [
      {
        id: 1, title: 'Projeto 2 teste 122343',
        description: null,
        status: null,
        type: null,
        created_at: null,
        ended_at: null,
        Instituiton: new Instituiton,
        Productions: [],
        ResourceRequest: [],
        Authors: []
      },
      {
        id: 2, title: 'Projeto 1 teste 123',
        description: null,
        status: null,
        type: null,
        created_at: null,
        ended_at: null,
        Instituiton: new Instituiton,
        Productions: [],
        ResourceRequest: [],
        Authors: []
      }
    ];


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [this.production.id],
        title: [this.production.title, [Validators.required]],
        description: [this.production.description, [Validators.required]],
        type: [this.production.type, [Validators.required]],
        created_at: [this.production.created_at],
        Project: this.formBuilder.group({
          id: [this.production.Project.id, [Validators.required]],
          title: [this.production.Project.title],
        }),
        Authors: this.formBuilder.array(this.production.Authors.map(author => this.createAuthorGroup(author)))
      });

      this.formattedEnumTypes = Object.keys(this.enumTypes);

    }

    createAuthorGroup(author: Person): FormGroup {
      return this.formBuilder.group({
        // Initialize Author form group based on Person class properties
      });
    }


    onSubmit(): void {
      if (FormValidations.checkValidity(this.form)){
        const formValue = this.form.value;
        console.log(formValue);
      }else{
        console.log(this.form);
        
      }
    }

    cancelar(): void {
        const formValue = this.form.value;
        console.log(formValue, "cncelado");
    }

    getErrorMessage(campoName: string, campo: string, small: boolean = false) {
      return FormValidations.getErrorMessage(campoName, campo, this.form, small);
    }

}
