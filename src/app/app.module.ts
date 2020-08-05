import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormBuilderModule } from './modules/form-builder/form-builder.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		FormBuilderModule,
		HttpClientModule,
		NgbModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
