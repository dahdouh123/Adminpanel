import {BrowserModule} from '@angular/platform-browser';
import {NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgChartsModule } from 'ng2-charts';

import {MatCardModule} from '@angular/material/card';
import { StockPhoneComponent } from './stock-phone/stock-phone.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { NgxSpinnerModule } from "ngx-spinner";
import { 
	IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule
 } from "igniteui-angular";

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import { PucesComponent } from './puces/puces.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationComponent} from './notification/notification.component';
import {ButtonComponent} from './components/button/button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import { AngularMaterialModule } from './angular-material.module';

import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CommandesComponent } from './commandes/commandes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatSelectModule } from '@angular/material/select';
import { PhonesComponent } from './phones/phones.component';
import { PromoComponent } from './promo/promo.component';

import { EditphoneComponent } from './editphone/editphone.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { MatTableModule } from '@angular/material/table';
import {AccessoiresComponent} from './accessoires/accessoires.component'
import { UsersComponent } from './users/users.component';
import { VentesComponent } from './ventes/ventes.component';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        AccessoiresComponent,
        StockPhoneComponent,
        NotificationComponent,
        MainComponent,
        VentesComponent,
        PromoComponent,
        PucesComponent,
        LoginComponent,
        HeaderComponent,
        CommandesComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        ControlSidebarComponent,
        SelectComponent,
        UsersComponent,
        CheckboxComponent,
        CommandesComponent,
        PhonesComponent,
        EditphoneComponent,
        SearchFilterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatPaginatorModule,
        NgChartsModule,
        NgChartsModule,
        MatTableModule ,
        MatDialogModule,
        IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule,
        MatDividerModule, 
        Ng2SearchPipeModule,
        NgxSpinnerModule,
       MatCardModule,
        MatIconModule,
        NgxPaginationModule,
        
        




        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule, 
        
        MatToolbarModule,
        MatPaginatorModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        MatIconModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule,
        BrowserModule,
  BrowserAnimationsModule,
  AngularMaterialModule,
  MatListModule, 
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule

    ],
    
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {}
