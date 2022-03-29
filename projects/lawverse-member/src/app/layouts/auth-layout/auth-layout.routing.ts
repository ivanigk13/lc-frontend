import { Routes } from '@angular/router';
import { AccountDetailComponent } from '../../pages/account-detail/account-detail.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'account-detail',
        component: AccountDetailComponent
    }
];
