import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm/cancel-confirm.component';
import { FormValidations } from '../../../../utils/form-validations';
import { ApiService } from '../../../api/api.service';
import { StorageService } from '../../../db/storage.service';
import { User } from '../../../models/User';
import { Person } from '../../../models/Person';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Enum_PersonTitulation from '../../../models/enumerations/Enum_PersonTitulation.json';
import Enum_PersonType from '../../../models/enumerations/Enum_PersonType.json';
import { MatSelectModule } from '@angular/material/select';
import { Institution } from '../../../models/Institution';
import { KnowledgeArea } from '../../../models/KnowledgeArea';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CancelConfirmComponent,
    NgxMaskDirective,
    MatDatepickerModule,
    MatNativeDateModule,
  MatSelectModule],
    providers: [provideNgxMask()],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {

  title: string = "Cadastro de Pesquisador"

  editing: boolean = false

  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  public form!: FormGroup; 
  formBuilder: FormBuilder = new FormBuilder();
  loggedUser : User | null = null;

  mascara_tel: string = "(00) 0000-0000||(00) 00000-0000";

  person: Person = new Person()

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  enumPersonType: any = Enum_PersonType;
  formattedEnumPersonType : string[] | null = Object.keys(this.enumPersonType);

  enumPersonTitulation: any = Enum_PersonTitulation;
  formattedEnumPersonTitulation : string[] | null = Object.keys(this.enumPersonTitulation);

  institutions: Array<Institution> = [];
  knowledgeAreas: Array<KnowledgeArea> = [];

  constructor(public dialogRef: MatDialogRef<PersonComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: {id: number} | null) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        id: [this.person.id],
        name: [this.person.name, [Validators.required]],
        phone: [this.person.phone, [Validators.required, FormValidations.DDD]],
        BirthDate: [this.person.BirthDate, [Validators.required, FormValidations.validaDataNascimento]],
        titulation: [this.person.titulation, []],
        type: [this.person.type, [Validators.required]],
        LattesId: [this.person.LattesId],
        Institution: this.formBuilder.group({
          id: [this.person.Institution.id, [Validators.required]],
          name: [this.person.Institution.name],
        }),
        KnowledgeArea: this.formBuilder.group({
          id: [this.person.KnowledgeArea.id, [Validators.required]],
          name: [this.person.KnowledgeArea.name],
          codCnpq: [this.person.KnowledgeArea.codCnpq],
        }),
    });

    if(this.dialogData){
      this.api.GetPersonById(+this.dialogData.id).subscribe(resp => {
        if (resp && resp.success) {
          this.person.id = resp.person.id;
          this.person.name = resp.person.name;
          this.person.BirthDate = resp.person.birthDate;
          this.person.phone = resp.person.phone;
          this.person.LattesId = resp.person.lattesId;
          this.person.knowledge_area_id = resp.person.knowledgeAreaId;
          this.person.Institution = resp.person.institution;
          this.person.KnowledgeArea = resp.person.knowledgeArea;
          this.person.instituition_id = resp.person.institutionId;
          this.person.type = resp.person.type;
          this.person.titulation = resp.person.titulation;
          this.editing = true;
          this.updateForm(this.person);
        }else{
          this.router.navigateByUrl("person")
        }
      });
    }

    this.getLoggedUser();
    this.getInstitutions();
    this.getKnowledgeAreas();
   
  }

  updateForm(person: any) {
    this.form.patchValue({
      id: person.id,
        name: person.name,
        phone: person.phone,
        BirthDate: person.BirthDate,
        titulation: person.titulation + "",
        type: person.type + "",
        LattesId: person.LattesId,
        Institution: {
          id: person?.Institution?.id,
          name: person?.Institution?.name,
        },
        KnowledgeArea: {
          id: person?.KnowledgeArea?.id,
          name: person?.KnowledgeArea?.name,
          codCnpq: person?.KnowledgeArea?.codCnpq
        }
    })
  }

  getLoggedUser(){
    this.storage.GetLoggedUserAsync().then(resp => {
      this.loggedUser = resp;
    })   
    
  }

  getInstitutions(){
    this.api.ListInstitutionsSimple().subscribe(async resp => {
      if (resp && resp.success) {
        this.institutions = resp.institutions ?? [];
        
      }
    });
  }

  getKnowledgeAreas(){
    this.api.ListKnowledgeAreasSimple().subscribe(async resp => {
      if (resp && resp.success) {
        this.knowledgeAreas = resp.knowledgeAreas ?? [];
        
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editing && this.person.id !== this.loggedUser?.person?.id) {
      this.api.openSnackBar("Apenas a pessoa pode atualizar seus dados!");
      return;
    }

    if (FormValidations.checkValidity(this.form)){ 
      const formValue = this.form.value;
      
      this.person.id = formValue.id
      this.person.BirthDate = formValue.BirthDate
      this.person.instituition_id = formValue.Institution.id
      this.person.knowledge_area_id = formValue.KnowledgeArea.id
      this.person.LattesId = formValue.LattesId
      this.person.name = formValue.name
      this.person.phone = formValue.phone
      this.person.titulation = +formValue.titulation
      this.person.type = +formValue.type
      this.person.KnowledgeArea = formValue.KnowledgeArea
      this.person.Institution = formValue.Institution

      this.api.UpdatePerson(this.person).subscribe(resp => {
        if(resp && resp.success){
          this.api.openSnackBar("Sucesso!")
          this.dialogRef.close();       

        }
      })
    }
    
  }


  getErrorMessage(campoName: string, campo: string, small: boolean = false) {
    return FormValidations.getErrorMessage(campoName, campo, this.form, small);
  }

}
