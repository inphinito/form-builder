import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NormalizedCharsValidator } from '../../validators/normalizedChars.validator';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['table'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null, Validators.required],
		caption: [null],
		required: [false],
		properties: this._formBuilder.array([]),
		triggers: [null],
	});

	get properties(): FormArray {
		return this.form.get('properties') as FormArray;
	}

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder
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

	dismiss(): void {
		this._activeModal.close();
	}

	saveAndDismiss(): void {
		this._activeModal.close(this.form.value);
	}
}
