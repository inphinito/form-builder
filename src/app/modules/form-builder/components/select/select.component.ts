import { Component, Input, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
	@Input() value: any;

	urelRegEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

	form: FormGroup = this._formBuilder.group({
		type: ['select'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null, Validators.required],
		required: [false],
		placeholder: [null],
		multiple: [false],
		format: ['dropdown'],
		properties: this._formBuilder.array([]),
		feeding_type: ['static', Validators.required],
		external_feeding_config: this._formBuilder.group({
			endpoint: [null, [Validators.required, Validators.pattern(this.urelRegEx)]],
			value_property: [null, Validators.required],
			text_property: [null, Validators.required]
		}),
		default: [],
		triggers: [null],
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
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.value.properties.forEach(o => this.addOption(o));
		} else {
			this.addOption();
		}
	}

	addOption(value: any = {}): void {
		const properties = this.form.get('properties') as FormArray;
		properties.push(
			this._formBuilder.group({
				type: ['option'],
				value: [value.value, Validators.required],
				description: [value.description, Validators.required]
			})
		);
	}

	removeByIndex(index: number) {
		const properties = this.form.get('properties') as FormArray;
		properties.removeAt(index);
	}

	dismiss() {
		this._activeModal.close();
	}

	saveAndDismiss() {
		this._activeModal.close(this.form.value);
	}

	setValidators() {
		if (this.form.get('feeding_type').value === 'external') {
			(this.form.get('properties') as FormArray).controls.forEach((formGroup: FormGroup) => {
				Object.keys(formGroup.controls).forEach(key => {
					formGroup.get(key).clearValidators();
					formGroup.get(key).updateValueAndValidity();
				});
			});

			this.form.get('external_feeding_config.endpoint').setValidators([Validators.required, Validators.pattern(this.urelRegEx)]);
			this.form.get('external_feeding_config.endpoint').updateValueAndValidity();
			this.form.get('external_feeding_config.value_property').setValidators([Validators.required]);
			this.form.get('external_feeding_config.value_property').updateValueAndValidity();
			this.form.get('external_feeding_config.text_property').setValidators([Validators.required]);
			this.form.get('external_feeding_config.text_property').updateValueAndValidity();
		} else if (this.form.get('feeding_type').value === 'static') {
			(this.form.get('properties') as FormArray).controls.forEach((formGroup: FormGroup) => {
				Object.keys(formGroup.controls).forEach(key => {
					formGroup.get(key).setValidators([Validators.required]);
					formGroup.get(key).updateValueAndValidity();
				});
			});

			this.form.get('external_feeding_config.endpoint').clearValidators();
			this.form.get('external_feeding_config.endpoint').updateValueAndValidity();
			this.form.get('external_feeding_config.value_property').clearValidators();
			this.form.get('external_feeding_config.value_property').updateValueAndValidity();
			this.form.get('external_feeding_config.text_property').clearValidators();
			this.form.get('external_feeding_config.text_property').updateValueAndValidity();
		}
	}
}
