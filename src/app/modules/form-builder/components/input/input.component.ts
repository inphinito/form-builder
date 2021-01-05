import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilderService } from '../../services/form-builder.service';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

	@Input() value: any;

	roles = this._configSvc.config.roles || [];

	form: FormGroup = this._formBuilder.group({
		type: ['input'],
		key: [null, [Validators.required, NormalizedCharsValidator]],
		description: [null, Validators.required],
		required: [false],
		format: ['text'],
		placeholder: [null],
		maximun: [20],
		minimun: [0],
		default: [null],
		step: [1],
		triggers: [null],
		permissions: [null]
	});

	activeNavId: number = 1;

	formats: string[] = [
		'checkbox',
		'color',
		'datetime',
		'date',
		'time',
		'file',
		'number',
		'range',
		'text',
		'time',
		'email'
	];

	constructor(
		private _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _translationSvc: TranslationService,
		private _configSvc: FormBuilderService
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
