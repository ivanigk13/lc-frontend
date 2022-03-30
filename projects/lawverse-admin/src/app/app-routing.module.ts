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
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { CategoryAddComponent } from './pages/category/category-add/category-add.component';
import { IndustryListComponent } from './pages/industry/industry-list/industry-list.component';
import { IndustryAddComponent } from './pages/industry/industry-add/industry-add.component';
import { PositionListComponent } from './pages/position/position-list/position-list.component';
import { PositionAddComponent } from './pages/position/position-add/position-add.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleAddComponent } from './pages/role/role-add/role-add.component';
import { TransactionStatusListComponent } from './pages/transaction-status/transaction-status-list/transaction-status-list.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardComponent },                                                                       
                    { path: 'uikit/formlayout', component: FormLayoutComponent },
                    { path: 'uikit/input', component: InputComponent },
                    { path: 'uikit/floatlabel', component: FloatLabelComponent },
                    { path: 'uikit/invalidstate', component: InvalidStateComponent },
                    { path: 'uikit/button', component: ButtonComponent },
                    { path: 'uikit/table', component: TableComponent },
                    { path: 'uikit/list', component: ListComponent },
                    { path: 'uikit/tree', component: TreeComponent },
                    { path: 'uikit/panel', component: PanelsComponent },
                    { path: 'uikit/overlay', component: OverlaysComponent },
                    { path: 'uikit/media', component: MediaComponent },
                    { path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule) },
                    { path: 'uikit/message', component: MessagesComponent },
                    { path: 'uikit/misc', component: MiscComponent },
                    { path: 'uikit/charts', component: ChartsComponent },
                    { path: 'uikit/file', component: FileComponent },
                    { path: 'pages/crud', component: CrudComponent },
                    { path: 'pages/timeline', component: TimelineComponent },
                    { path: 'pages/empty', component: EmptyComponent },
                    { path: 'icons', component: IconsComponent },
                    { path: 'blocks', component: BlocksComponent },
                    { path: 'documentation', component: DocumentationComponent },
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
            },
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
            { path: 'pages/landing', component: LandingComponent },
            { path: 'pages/login', component: LoginComponent },
            { path: 'pages/error', component: ErrorComponent },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: 'pages/access', component: AccessComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
