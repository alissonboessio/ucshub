import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StorageService } from './db/storage.service';
import { User } from './models/User';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SimpleDialogInterface } from '../components/dialogs/simple-dialog/simpleDialogInterface';
import { SimpleDialogComponent } from '../components/dialogs/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RotinaService } from './rotinas/rotina.service';
import { MatMenuModule } from '@angular/material/menu';
import { ResourceRequestComponent } from './pages/resource/registration/resource-request.component';
import { InstitutionComponent } from './pages/institution/registration/institution.component';
import { PersonComponent } from './pages/person/registration/person.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UCShub';

  showMenu: boolean = false;

  router: Router = inject(Router);
  rotina: RotinaService = inject(RotinaService);
  dialog: MatDialog = inject(MatDialog)
  storage: StorageService = inject(StorageService);
  loggedUser: User | null = new User();

  constructor(){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
          if (e.url === '/login' || e.url.startsWith('/login')) {
              this.showMenu = false
          } else {
              this.showMenu = true
          }

          this.storage.GetLoggedUserAsync().then(u => {
              if (u) {
                  this.loggedUser = u
              }
          })

      }
  });
  }

  async ngOnInit() {
    this.storage.GetLoggedUserAsync().then(u => {
        if (u) {
            this.loggedUser = u
        } else {
            this.loggedUser = null
            this.router.navigate(['login']);
        }
    })

    
}

async handleLogout() {
  const dialogInterface: SimpleDialogInterface = {
      dialogHeader: 'Sair do perfil?',
      dialogContent: 'Você poderá entrar em outro momento',
      cancelButtonLabel: 'Ficar',
      confirmButtonLabel: 'Sair',
      callbackConfirm: () => {
          this.rotina.LogOf()
          this.router.navigate(['/login'])
      },
      callbackCancel: () => { },
  };
  this.dialog.open(SimpleDialogComponent, {
      width: '400px',
      data: dialogInterface,
  });

}

addResearcher(){
    const dialogRef = this.dialog.open(PersonComponent, {
        width: '800px',
        disableClose: true,
        data: null 
    });
}

addInstitution(){
    const dialogRef = this.dialog.open(InstitutionComponent, {
      width: '600px',
      disableClose: true,
      data: null 
  });
}

addResource(){
    
    const dialogRef = this.dialog.open(ResourceRequestComponent, {
        width: '600px',
        disableClose: true,
        data: null 
    });

  
}


}
