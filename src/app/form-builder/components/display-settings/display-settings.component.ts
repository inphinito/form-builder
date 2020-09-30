import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-form-builder-display-settings',
	templateUrl: './display-settings.component.html',
	styleUrls: ['./display-settings.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DisplaySettingsComponent),
			multi: true
		}
	]
})
export class DisplaySettingsComponent implements OnInit {

	form = this._fb.group({
		'col': [12, Validators.required],
		'col-sm': [12, Validators.required],
		'col-md': [12, Validators.required],
		'col-lg': [12, Validators.required],
		'col-xl': [12, Validators.required],
		'offset': [12, Validators.required],
		'offset-sm': [0, Validators.required],
		'offset-md': [0, Validators.required],
		'offset-lg': [0, Validators.required],
		'offset-xl': [0, Validators.required],
	});

	isDisabled: boolean;

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.form.valueChanges.subscribe((changes) => {
			this.onChange(this.form.value);
		});
	}

	onChange = (_: any) => { };
	onTouch = () => { };

	writeValue(value: any = null): void {
		this.form.patchValue(value || {});
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
		this.isDisabled ? this.form.disable() : this.form.enable();
	}

}
