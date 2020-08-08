import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { OverlayModule } from './overlay/overlay.module';

import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MessageListComponent } from './components/message-list/message-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ModPaneComponent } from './components/mod-pane/mod-pane.component';
import { DashboardComponent } from './radmin/dashboard/dashboard.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    NavigationComponent,
    ModPaneComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    SocketIoModule.forRoot(config),
    OverlayModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
