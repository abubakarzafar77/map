import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAtF9CghVUAdK4mrAh2V2AOrT1UCsbzAUE',
            libraries: ["places"]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
