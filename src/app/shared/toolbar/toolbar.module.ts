import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar.component';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    
    LayoutModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [],
  bootstrap: [ToolbarComponent]
})
export class AppToolbar { }
