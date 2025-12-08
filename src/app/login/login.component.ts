import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../sevices/token.service';
import { RouteService } from '../sevices/route.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

    authRequest: {email: '', password: ''} = {email: '', password: ''};
    errorMsg: Array<string> = [];

    constructor(
        private router: Router,
        private routeService: RouteService, 
        private tokenService: TokenService
    ){}

    login() {
        this.errorMsg = [];
        this.routeService.authenticate(
            this.authRequest
        ).subscribe({
            next: (res: { token?: string; }) => {
                this.tokenService.token = res.token as string
                const returnUrl = sessionStorage.getItem("returnUrl");

            if (returnUrl) {
                sessionStorage.removeItem("returnUrl");
                this.router.navigate([returnUrl]);
            } else {
                this.router.navigate(['/']);
            }
            },
            error: (err: any) => {
                console.error('error ', err);
                // if (err.error.validationErrors) {
                //     this.errorMsg = err.error.validationErrors
                // } else {
                //     this.errorMsg.push(err.error.error)
                // }
            }
        })
    }

    register() {
        this.router.navigate(['register']);
    }

}
