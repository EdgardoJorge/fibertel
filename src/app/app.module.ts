import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./modules/auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,   
        SharedModule,
        HttpClientModule,
        AuthModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {

}