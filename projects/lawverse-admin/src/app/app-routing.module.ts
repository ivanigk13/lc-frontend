import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent },                                                                                           
                    {
                        path: 'category',
                        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
                    },
                    {
                        path: 'user',
                        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
                    },
                    {
                        path:'industry',
                        loadChildren: () => import('./pages/industry/industry.module').then(m => m.IndustryModule)
                    },
                    {
                        path:'position',
                        loadChildren: () => import('./pages/position/position.module').then(m => m.PositionModule)
                    },
                    {
                        path: 'role',
                        loadChildren: () => import('./pages/role/role.module').then(m => m.RoleModule)
                    },
                    {
                        path:'transaction-status',
                        loadChildren: () => import('./pages/transaction-status/transaction-status.module').then(m => m.TransactionStatusModule)
                    },
                  
                ],
            }
            
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
