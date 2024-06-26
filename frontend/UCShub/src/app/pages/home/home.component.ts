import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ApiService } from '../../api/api.service';
import { Router, RouterModule } from '@angular/router';
import { SimpleCardComponent } from '../../../components/UI/SimpleCard/SimpleCard.component';
import { SimpleCardInterface } from '../../../components/UI/SimpleCard/SimpleCardInterface';
import { IconCardInterface } from '../../../components/UI/IconCard/IconCardInterface';
import { IconCardComponent } from '../../../components/UI/IconCard/IconCard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, SimpleCardComponent, IconCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

  api: ApiService = inject(ApiService)
  router: Router = new Router();

  searchField = new FormControl();

  topContentProd1: SimpleCardInterface = { content: "6225", contentSize: "32"}
  bottomContentProd1: SimpleCardInterface = { content: "Produções Acadêmicas", contentSize: "14"}

  topContentProd2: SimpleCardInterface = { content: "3651", contentSize: "32"}
  bottomContentProd2: SimpleCardInterface = { content: "Produções Técnicas", contentSize: "14"}

  topContentIconCard3: IconCardInterface = { content: "9876", contentSize: "50"}
  bottomContentIconCard3: IconCardInterface = { content: "Produções Submetidas", contentSize: "18"}
  IconCard3: string = "library_books"

  topContentIconCard4: IconCardInterface = { content: "289", contentSize: "58"}
  bottomContentIconCard4: IconCardInterface = { content: "Pesquisadores Cadastrados", contentSize: "28"}
  IconCard4: string = "person"

  filterProductions(){    
    this.router.navigateByUrl("/list-productions")
  }


}
