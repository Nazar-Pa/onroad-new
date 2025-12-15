import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    returnUrl: string = '/';
    private route = inject(ActivatedRoute);

    constructor(
        private router: Router,
        private routeService: RouteService, 
        private tokenService: TokenService
    ){}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.errorMsg = [];
        this.routeService.authenticate(
            this.authRequest
        ).subscribe({
            next: (res: { token?: string; }) => {
                this.tokenService.token = res.token as string
                const returnUrl = sessionStorage.getItem("returnUrl");
                this.router.navigateByUrl(this.returnUrl);
            },
            error: (err: any) => {
                console.error('error ', err);
            }
        })
    }

    register() {
        this.router.navigate(['register']);
    }

}
