import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-table-code',
	templateUrl: './table-code.component.html',
	styleUrls: ['./table-code.component.scss']
})
export class TableCodeComponent implements AfterViewInit {
	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		code: [null, Validators.required]
	});

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _changeDetectorRef: ChangeDetectorRef
	) { }

	ngAfterViewInit() {
		if (this.value) {
			this.form.patchValue({ code: this.value });
		}

		this._changeDetectorRef.detectChanges();
	}

	save() {
		this._activeModal.close(this.form.get('code').value);
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
