import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

	@Input() value: any;

	roles: Array<{ id: number, name: string }>;

	form: FormGroup = this._formBuilder.group({
		type: ['textarea'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null],
		required: [false],
		default: [null],
		placeholder: [''],
		cols: [20],
		rows: [5],
		triggers: [null],
		permissions: [null]
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

	dismiss() {
		if (this.form.dirty) {
			if (confirm(this._translationSvc.instant('MESSAGES.EXIT_WITHOUT_SAVE'))) {
				this._activeModal.close();
			}
		} else {
			this._activeModal.close();
		}
	}

	saveAndDismiss() {
		this._activeModal.close(this.form.value);
	}
}
