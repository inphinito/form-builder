import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

	@Input() value: any;

	roles: Array<{ id: number, name: string }>;

	form: FormGroup = this._formBuilder.group({
		type: ['file'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null],
		required: [false],
		accepts: [],
		namingPattern: [null],
		default: [null],
		multiple: [false],
		maximun: [20],
		minimun: [0],
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
