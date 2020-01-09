import { Component, Input, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterViewInit {
	@Input() value: any;

	@ViewChild('text', { static: false }) text: TemplateRef<any>;

	form: FormGroup = this._formBuilder.group({
		name: [null, Validators.required],
		required: [false, Validators.required],
		type: ['text', Validators.required],
		placeholder: [null],
		value: [null],
		maxlength: [10],
		max: [20],
		min: [0],
		selected: [false],
		multiple: [false],
		step: [1],
		controlName: [null]
	});
	selectedType: TemplateRef<any>;
	types: string[] = [
		// 'button',
		// 'checkbox',
		'color',
		'date',
		// 'datetime',
		// 'email',
		'file',
		// 'hidden',
		'number',
		// 'radio',
		'range',
		'text',
		'time'
	];

	constructor(
		public _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _changeDetectorRef: ChangeDetectorRef
	) { }

	ngAfterViewInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.selectedType = this[this.form.get('type').value];
		} else {
			this.selectedType = this.text;
		}

		this._changeDetectorRef.detectChanges();
	}

	selectType(type: string) {
		this.form.get('value').setValue(type === 'range' ? 10 : null);
		this.selectedType = this[type];
	}

	save() {
		this._activeModal.close(this.form.value);
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
