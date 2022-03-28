import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { CommandesComponent } from './commandes/commandes.component';
import { PhonesComponent } from './phones/phones.component';
import { AccessoiresComponent } from './accessoires/accessoires.component';
import { PromoComponent } from './promo/promo.component';
import { PucesComponent } from './puces/puces.component';
import { UserComponent } from '@modules/main/header/user/user.component';
import { UsersComponent } from './users/users.component';
import { StockPhoneComponent } from './stock-phone/stock-phone.component';
import { VentesComponent } from './ventes/ventes.component';
import { AchatsComponent } from './achats/achats.component';
import { NotificationComponent } from './notification/notification.component';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'phone-stock',
                component: StockPhoneComponent
            },
            {
                path: 'ventes',
                component: VentesComponent
            },
            {
                path: 'achats',
                component: AchatsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'commandes',
                component: CommandesComponent
            },
            {
                path: 'phones',
                component: PhonesComponent
            },
            {
                path: 'promo',
                component: PromoComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'puces',
                component: PucesComponent
            },
            
            {
                path: 'accessoires',
                component: AccessoiresComponent
            },
            
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
