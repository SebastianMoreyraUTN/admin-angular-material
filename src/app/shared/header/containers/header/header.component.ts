import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Email, User } from '../../../../pages/auth/models';
import { AuthService, EmailService } from '../../../../pages/auth/services';
import { routes } from '../../../../consts';
import { TemaService } from '../../../../services/tema.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$: Observable<User>;
  public emails$: Observable<Email[]>;
  public routers: typeof routes = routes;
  public isChecked: boolean = false;
  public tema: string = 'Light';

  constructor(
    private userService: AuthService,
    private emailService: EmailService,
    private router: Router,
    private temaService: TemaService
  ) {
    this.user$ = this.userService.getUser();
    this.emails$ = this.emailService.loadEmails();
  }

  ngOnInit() {
    if (this.temaService.colorScheme === 'dark-theme') {
      this.isChecked = true;
      this.tema = 'Dark';
    }
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.userService.signOut();

    this.router.navigate([this.routers.LOGIN]);
  }

  cambiarTema(): void {
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
    console.log('cambio');
    if (this.isChecked === true) {
      this.tema = 'Dark';
      this.temaService.update('dark-theme');
    } else {
      this.tema = 'Light';
      this.temaService.update('light-theme');
    }
  }
}
