import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilderService } from '../../services/form-builder.service';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

	@Input() value: any;

	roles = this._configSvc.config.roles || [];

	form: FormGroup = this._formBuilder.group({
		type: ['table'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null, Validators.required],
		caption: [null],
		required: [false],
		properties: this._formBuilder.array([]),
		triggers: [null],
		permissions: [null],
	});

	get properties(): FormArray {
		return this.form.get('properties') as FormArray;
	}

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _translationSvc: TranslationService,
		private _configSvc: FormBuilderService
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.value.properties.forEach(o => this.addOption(o));
		} else {
			this.addOption();
		}
	}

	addOption(value?: any): void {
		const properties = this.form.get('properties') as FormArray;
		const formGroup = this._formBuilder.group({
			description: [null, Validators.required],
			properties: this._formBuilder.array([])
		});
		if (value) {
			formGroup.patchValue(value);
		}
		properties.push(formGroup);
	}

	removeByIndex(index: number): void {
		const properties = this.form.get('properties') as FormArray;
		properties.removeAt(index);
	}

	dismiss() {
		if (this.form.dirty) {
			if (confirm(this._translationSvc.instant('MESSAGES.EXIT_WITHOUT_SAVE'))) {
				this._activeModal.close();
			}
		} else {
			this._activeModal.close();
		}
	}

	saveAndDismiss(): void {
		this._activeModal.close(this.form.value);
	}
}
