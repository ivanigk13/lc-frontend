import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AccessGuard } from './guard/access.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'login',
                loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'register',
                loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
            },
            {
                path: 'account-detail',
                loadChildren: () => import('./pages/account-detail/account-detail.module').then(m => m.AccountDetailModule)
            },
            {
                path: 'verification',
                loadChildren: () => import('./pages/register-verification/register-verification.module').then(m => m.RegisterVerificarionModule)
            },
            {
                path: 'member',
                loadChildren: () => import('../../../lawverse-member/src/app/app.module').then(m => m.AppModule)
            },
            {
                path: 'admin',
                component: AppMainComponent,
                children: [      
                    {
                        path: 'dashboard',
                        component: DashboardComponent,
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },              
                    {
                        path: 'category',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/category/category.module').then(m => m.CategoryModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: 'user',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/user/user.module').then(m => m.UserModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: 'industry',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/industry/industry.module').then(m => m.IndustryModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: 'position',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/position/position.module').then(m => m.PositionModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: 'role',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/role/role.module').then(m => m.RoleModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: 'transaction-status',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/transaction-status/transaction-status.module').then(m => m.TransactionStatusModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: "activity",
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/activity/activity.module').then(m => m.ActivityModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    },
                    {
                        path: "subscribe",
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/subscribe/subscribe.module').then(m => m.SubscribeModule),
                        canLoad: [AuthGuard],
                        canActivate: [AccessGuard]
                    }

                ],
            },

            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: '**', redirectTo: 'pages/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
