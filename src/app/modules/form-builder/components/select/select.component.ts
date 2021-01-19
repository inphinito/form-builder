import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';
import { TranslationService } from '../../services/translation.service';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

	@Input() value: any;

	roles: Array<{ id: number, name: string }>;

	urlRegEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

	form: FormGroup = this._formBuilder.group({
		type: ['select'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null],
		required: [false],
		placeholder: [null],
		multiple: [false],
		format: ['dropdown'],
		feeding_type: ['static', Validators.required],
		properties: this._formBuilder.array([]),
		external_feeding_config: this._formBuilder.group({
			endpoint: [null, [Validators.required, Validators.pattern(this.urlRegEx)]],
			value_property: [null, Validators.required],
			text_property: [null, Validators.required]
		}),
		default: [],
		triggers: [null],
		permissions: [null],
		// 'display-settings': [null]
	});

	formats: string[] = [
		'dropdown',
		'radio'
	];

	get properties(): FormArray {
		return this.form.get('properties') as FormArray;
	}

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _translationSvc: TranslationService
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);

			if (this.value.properties) {
				this.value.properties.forEach(o => this.addOption(o));
			}
		} else {
			this.addOption();
		}

		this.toggleFeedingTypeForms();
	}

	addOption(value?: any, index?: number): void {
		const properties = this.form.get('properties') as FormArray;
		const formGroup = this._formBuilder.group({
			type: ['option'],
			value: [null, Validators.required],
			description: [null, Validators.required]
		});
		if (value) {
			formGroup.patchValue(value);
		}
		index !== undefined ? properties.insert(index, formGroup) : properties.push(formGroup);
	}

	removeByIndex(index: number) {
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

	saveAndDismiss() {
		if (this.form.invalid) {
			this.getFormValidationErrors();
			return;
		}
		this._activeModal.close(this.form.value);
	}

	getFormValidationErrors() {
		Object.keys(this.form.controls).forEach(key => {

			if (this.form.get(key).constructor === FormControl) {
				const controlErrors: ValidationErrors = this.form.get(key).errors;

				if (controlErrors != null) {
					Object.keys(controlErrors).forEach(keyError => {
						console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
					});
				}
			} else if (this.form.get(key).constructor === FormControl) {
				Object.keys(this.form.get(key)['controls']).forEach(key => {
					this.getFormValidationErrors;
				});
			}
		});
	}

	toggleFeedingTypeForms() {
		const propertiesFA = this.form.get('properties') as FormArray;
		const externalFeedingConfigFG = this.form.get('external_feeding_config') as FormGroup;

		switch (this.form.get('feeding_type').value) {
			case 'external':
				propertiesFA.disable();
				externalFeedingConfigFG.enable();
				break;
			case 'static':
				propertiesFA.enable();
				externalFeedingConfigFG.disable();
				break;
		}
	}

	onMoved(item: any) {
		const index = this.properties.controls.indexOf(item)
		this.properties.removeAt(index);
	}

	onDrop(event: DndDropEvent) {
		if (event.dropEffect === 'move') {
			this.addOption(event.data, event.index);
		}
	}
}
