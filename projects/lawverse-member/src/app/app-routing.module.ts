import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';
@NgModule({
    imports: [
        RouterModule.forChild([                
            {
                path: 'profile',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'bookmarked-thread',
                loadChildren: () => import('./pages/bookmarked-thread/bookmarked-thread.module').then(m => m.BookmarkedThreadModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'article',
                loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'activity',
                loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'thread',
                loadChildren: () => import('./pages/thread/thread.module').then(m => m.ThreadModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'order',
                loadChildren: () => import('./pages/order/order.module').then( m => m.OrderModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'my-activity',
                loadChildren: () => import('./pages/my-activity/my-activity.module').then(m => m.MyActivityModule),
                canLoad: [AuthGuard]
            }

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
