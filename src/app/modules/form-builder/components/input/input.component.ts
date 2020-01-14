import { Component, Input, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['input'],
		key: [null, Validators.required],
		description: [null, Validators.required],
		required: [false],
		format: ['text'],
		placeholder: [null],
		maximun: [20],
		minimun: [0],
		value: [null],
		// selected: [false],
		// multiple: [false],
		step: [1],
		// controlName: [null]
	});
	formats: string[] = [
		// 'button',
		'checkbox',
		'color',
		'datetime',
		'date',
		'time',
		// 'email',
		'file',
		// 'hidden',
		'number',
		// 'radio',
		'range',
		'text',
		'time',
		'email'
	];

	constructor(
		public _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
		}
	}

	dismiss() {
		this._activeModal.close();
	}

	saveAndDismiss() {
		this._activeModal.close(this.form.value);
	}
}
