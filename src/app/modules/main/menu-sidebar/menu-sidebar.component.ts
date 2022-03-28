import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        icon: 'fa fa-home',
        name: 'Dashboard',
        path: ['/']
    },
    {   icon:'fa fa-warehouse',
        name: 'Gestion de Stock',
        children: [
            {   icon:'fa fa-warehouse',
                name: 'Phones Stock',
                path: ['/phone-stock']
            },

            {   icon:'fa fa-warehouse',
                name: 'Accessoires Stock',
                path: ['/acc-stock']
            }
        ]
    },

    {   icon:'fa fa-money-bill',
    name: 'Ventes',
    children: [
        {   icon:'fa fa-warehouse',
            name: 'Vente Commandes',
            path: ['//ventes']
        }
    ]
},
    
   


    {
        icon: 'fa fa-users',
        name: 'Users',
        path: ['/users']
    },

    {
        icon: 'fa fa-mobile',
        name: 'Phones Management',
        path: ['/phones'],
    },
    {
        icon: 'fa fa-headphones',
        name: 'Accessoires',
        path: ['/accessoires'],
    },
    {
        icon: 'fa fa-microchip',
        name: 'Puces Management',
        path: ['/puces']
    },

    {
        icon: 'fa fa-cart-arrow-down',
        name: 'Commandes',
        path: ['/commandes'],
    },
    {
        icon: 'fa fa-bullhorn',
        name: 'Promo',
        path: ['/promo']
    },
    {
        icon: 'fa fa-bell',
        name: 'Notification Mobile',
        path: ['/notification']
    },


];
