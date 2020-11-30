import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';


@Component({
	selector: 'ngx-enriched-text',
	templateUrl: './enriched-text.component.html',
	styleUrls: ['./enriched-text.component.scss'],
})
export class EnrichedTextComponent implements OnInit {

	Editor = ClassicEditor;

	@Input() value: any;

	form: FormGroup = this._formBuilder.group({
		type: ['enriched-text'],
		value: [null, Validators.required],
		classList: [null],
		// 'display-settings': [null]
	});

	activeNavId: number = 1;

	constructor(
		private _formBuilder: FormBuilder,
		private _activeModal: NgbActiveModal,
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
