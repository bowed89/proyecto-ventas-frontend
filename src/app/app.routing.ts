import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { ProductosCreateComponent } from './components/productos/productos-create/productos-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';

const appRoute: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'productos', component: ProductoIndexComponent},
    {path: 'producto/registrar', component: ProductosCreateComponent},
    {path: 'producto/editar/:id', component: ProductoEditComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);
