import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderAComponent } from './header-a/header-a.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HeaderAComponent,
    HttpClientModule
  ],
  declarations: [
    // Add your components, directives, or pipes here
  ],
  providers: []
})
export class AppModule { }