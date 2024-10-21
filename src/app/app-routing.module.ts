import { NgModule } from "@angular/core";
import { Routes, RouterModule    } from "@angular/router";


const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('./modules/public/public.module')
        .then(m  => m.PublicModule)

    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module')
        .then(m => m.AuthModule)
    },

    {
        path: 'admin',
        loadChildren: () => import('./modules/admi-panel/admi-panel.module')
        .then(m => m.AdmiPanelModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})

export class AppRoutingModule {
    
}
