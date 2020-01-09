import { Component, Input, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss']
})
export class SelectComponent implements AfterViewInit {
	@Input() value: any;
	@ViewChild('table', { static: false }) table: ElementRef;

	options: any[] = [];
	selectType: string = 'select';
	optionText: string;
	optionValue: string;
	form: FormGroup = this._formBuilder.group({
		name: [null, Validators.required],
		required: [false, Validators.required],
		multiple: [false, Validators.required]
	});

	constructor(
		public _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _changeDetectorRef: ChangeDetectorRef
	) { }

	ngAfterViewInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.options = this.value.value && this.value.value.length ? this.value.value : [];
		}

		this._changeDetectorRef.detectChanges();
	}

	addOption() {
		if (this._validate()) {
			this.options.push({ text: '', value: '' });
			setTimeout(() => {
				this.table.nativeElement.scrollTop = this.table.nativeElement.scrollHeight;
			}, 10);
		}
	}

	delete(index: number) {
		this.options.splice(index, 1);
	}

	save() {
		if (this.options.length) {
			const value = this.form.value;

			value.value = this.options;
			this._activeModal.close(value);
		}
	}

	cancel() {
		this._activeModal.dismiss();
	}

	private _validate() {
		let result = true;
		const nOptions = this.options.length;
		const lastIndex = nOptions - 1;

		if (nOptions) {
			for (const [index, opt] of this.options.entries()) {
				const equals = (index !== lastIndex) ? opt.value === this.options[lastIndex].value : !opt.value.length;

				if (equals) {
					result = false;
					break;
				}
			}

			result = (nOptions > 1) ? this.options[lastIndex].value.length && result : result;
		}

		return result;
	}
}
