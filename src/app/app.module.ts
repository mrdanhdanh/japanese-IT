import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderAComponent } from './header-a/header-a.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseitemComponent } from './_component/baseitem/baseitem.component';

@NgModule({
  imports: [
    BrowserModule,
    HeaderAComponent,
    HttpClientModule,
    BaseitemComponent
  ],
  declarations: [
    // Add your components, directives, or pipes here
  ],
  providers: []
})
export class AppModule { }