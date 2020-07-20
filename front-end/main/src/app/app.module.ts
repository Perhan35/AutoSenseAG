import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAt6EGPVdGR7PKKBOUzkp39IbVbybCXau0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
