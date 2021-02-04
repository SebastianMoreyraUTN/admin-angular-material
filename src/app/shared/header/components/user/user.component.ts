import { Component, EventEmitter, Input, Output } from '@angular/core';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail = 'https://flatlogic.com';

  constructor(private router: Router) {}

  public signOutEmit(): void {
    this.signOut.emit();
  }

  irAlPerfil(): void {
    this.router.navigate(['../perfil-usuario']);
  }
}
