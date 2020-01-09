import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements AfterViewInit {
	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		name: [null, Validators.required],
		controlName: [null, Validators.required],
		value: [null],
		placeholder: [''],
		required: [false, [Validators.required]],
		cols: [20, [Validators.required]],
		rows: [5, [Validators.required]]
	});

	constructor(
		public _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _changeDetectorRef: ChangeDetectorRef
	) { }

	ngAfterViewInit() {
		if (this.value) {
			this.form.patchValue(this.value);
		}

		this._changeDetectorRef.detectChanges();
	}

	save() {
		this._activeModal.close(this.form.value);
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
