import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormBuilderModule } from './modules/form-builder/form-builder.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		TranslateModule.forRoot(),
		FormBuilderModule.forRoot({
			// components: ['tabs', 'fieldset', 'string', 'select', 'textarea', 'file']m
			roles: [{
				id: 1,
				name: 'super',
			}, {
				id: 4,
				name: 'admin',
			}, {
				id: 4,
				name: 'supervisor',
			}, {
				id: 4,
				name: 'technician',
			}]
		}),
		HttpClientModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
