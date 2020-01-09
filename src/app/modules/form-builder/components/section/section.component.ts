import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-section',
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss']
})
export class SectionComponent {

	form: FormGroup = this._formBuilder.group({
		title: [null, Validators.required]
	});

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder
	) { }

	save() {
		this._activeModal.close(this.form.value);
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
