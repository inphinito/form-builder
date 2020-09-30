import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { InputComponent } from './components/input/input.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { SelectComponent } from './components/select/select.component';
import { CodeComponent } from './components/code/code.component';
import { TableCodeComponent } from './components/table-code/table-code.component';
import { TableComponent } from './components/table/table.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FileComponent } from './components/file/file.component';
import { TriggersComponent } from './components/triggers/triggers.component';
import { EnrichedTextComponent } from '../../form-builder/components/enriched-text/enriched-text.component';
import { DisplaySettingsComponent } from '../../form-builder/components/display-settings/display-settings.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
	declarations: [
		FormBuilderComponent,
		FieldsetComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		CodeComponent,
		TableCodeComponent,
		TableComponent,
		TabsComponent,
		FileComponent,
		TriggersComponent,
		EnrichedTextComponent,
		DisplaySettingsComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		DndModule,
		NgbModalModule,
		NgbModule,
		CKEditorModule
	],
	exports: [
		FormBuilderComponent
	],
	entryComponents: [
		TabsComponent,
		FieldsetComponent,
		InputComponent,
		TextAreaComponent,
		SelectComponent,
		CodeComponent,
		TableCodeComponent,
		FileComponent,
		EnrichedTextComponent,
		DisplaySettingsComponent
	]
})
export class FormBuilderModule { }
