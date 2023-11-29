import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { SalesModule } from './pages/sales/sales.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [AppRoutingModule, SalesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
