import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';4
import { GridModule,PDFModule,ExcelModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    DateInputsModule,
    GridModule,
    PDFModule,
    PDFExportModule,
    DropDownsModule,
   ],
  exports: [
    GridModule,
    PDFModule,
    PDFExportModule,
    WeatherComponent,
    DropDownsModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
