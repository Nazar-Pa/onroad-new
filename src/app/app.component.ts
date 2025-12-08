import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BaseService } from './sevices/base.service';
import { NgIf } from '@angular/common';
import { TokenService } from './sevices/token.service';

@Component({
    selector: 'app-root',
    imports: [
      RouterOutlet,
      MatIconModule,
      MatMenuModule,
      RouterLink,
      NgIf
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'onroad-new';
  baseService = inject(BaseService);
  tokenService = inject(TokenService);

  logout() {
    this.tokenService.logout();
  }
}
