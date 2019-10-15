import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { OverlayComponent } from './overlay/overlay.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { DemoMaterialModule } from './datatable/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    DatatableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OverlayComponent
  ]
})
export class AppModule { }
