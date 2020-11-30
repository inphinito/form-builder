import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'ngx-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit {

	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['fieldset'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null, Validators.required],
		properties: [[]],
		triggers: [null]
	});

	activeNavId: number = 1;

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _translationSvc: TranslationService
	) { }

	ngOnInit() {
		if (this.value) {
			this.form.patchValue(this.value);
		}
	}

	save() {
		this._activeModal.close(this.form.value);
	}

	cancel() {
		if (this.form.dirty) {
			if (confirm(this._translationSvc.instant('MESSAGES.EXIT_WITHOUT_SAVE'))) {
				this._activeModal.close();
			}
		} else {
			this._activeModal.close();
		}
	}
}
