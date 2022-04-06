import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
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
                path: 'member',
                loadChildren: () => import('../../../lawverse-member/src/app/app.module').then(m => m.AppModule)
            },
            {
                path: 'admin',
                component: AppMainComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    {
                        path: 'category',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/category/category.module').then(m => m.CategoryModule)
                    },
                    {
                        path: 'user',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/user/user.module').then(m => m.UserModule)
                    },
                    {
                        path: 'industry',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/industry/industry.module').then(m => m.IndustryModule)
                    },
                    {
                        path: 'position',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/position/position.module').then(m => m.PositionModule)
                    },
                    {
                        path: 'role',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/role/role.module').then(m => m.RoleModule)
                    },
                    {
                        path: 'transaction-status',
                        loadChildren: () => import('../../../lawverse-admin/src/app/pages/transaction-status/transaction-status.module').then(m => m.TransactionStatusModule)
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
