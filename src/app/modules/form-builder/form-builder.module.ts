import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionComponent } from './components/section/section.component';
import { InputComponent } from './components/input/input.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { SelectComponent } from './components/select/select.component';
import { CodeComponent } from './components/code/code.component';
import { TableCodeComponent } from './components/table-code/table-code.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
	declarations: [
		FormBuilderComponent,
		SectionComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		CodeComponent,
		TableCodeComponent,
		TableComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		DndModule,
		NgbModalModule
	],
	exports: [
		FormBuilderComponent
	],
	entryComponents: [
		SectionComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		CodeComponent,
		TableCodeComponent
	]
})
export class FormBuilderModule { }
