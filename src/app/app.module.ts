import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { routing } from './app.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductosCreateComponent } from './components/productos/productos-create/productos-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';

// Paginaciones
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductoIndexComponent,
    SidebarComponent,
    ProductosCreateComponent,
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
