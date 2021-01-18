import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortingAlgorithmsComponent} from '../components/sorting-algorithms/sorting-algorithms.component'
import { PixelComponent} from '../components/pixel/pixel.component'

@NgModule({
  declarations: [
    AppComponent,
    SortingAlgorithmsComponent,
    PixelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
