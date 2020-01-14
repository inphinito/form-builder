import { Component, Input, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
	@Input() value: any;

	options: any[] = [];
	form: FormGroup = this._formBuilder.group({
		type: ['select'],
		key: [null, Validators.required],
		description: [null, Validators.required],
		required: [false],
		placeholder: [null],
		multiple: [false],
		format: ['dropdown'],
		properties: this._formBuilder.array([]),
		default: []
	});
	formats: string[] = [
		'dropdown',
		'radio'
	];

	get properties(): FormArray { return this.form.get('properties') as FormArray; }

	constructor(
		public _activeModal: NgbActiveModal,
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
}
