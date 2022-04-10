import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        RouterModule.forChild([                
            {
                path: 'profile',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'article',
                loadChildren: () => import('./pages/article/article.module').then(m => m.ArticleModule)
            },
            {
                path: 'activity',
                loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityModule)
            },
            {
                path: 'thread',
                loadChildren: () => import('./pages/thread/thread.module').then(m => m.ThreadModule)
            },
            {
                path: 'order',
                loadChildren: () => import('./pages/order/order.module').then( m => m.OrderModule)
            },
            {
                path: 'my-activity',
                loadChildren: () => import('./pages/my-activity/my-activity.module').then(m => m.MyActivityModule)
            }

        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
