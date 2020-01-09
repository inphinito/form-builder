import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-code',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss']
})
export class CodeComponent implements AfterViewInit {
	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		name: [null, Validators.required],
		required: [false, Validators.required],
		type: ['js', Validators.required],
		value: [null, Validators.required]
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
