import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-config-per-role',
	templateUrl: './config-per-role.component.html',
	styleUrls: ['./config-per-role.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ConfigPerRoleComponent),
			multi: true
		}
	]
})
export class ConfigPerRoleComponent implements OnInit, ControlValueAccessor {

	@Input()
	set roles(value: Array<{ id: number, name: string }>) {
		this.form = this._fb.array(value.map(o => {
			return this._fb.group({
				id: [o.id, Validators.required],
				name: [o.name, Validators.required],
				canView: [true],
				canEdit: [true],
			});
		}))
	}

	form: FormArray = this._fb.array([]);

	isDisabled: boolean = false;

	constructor(
		private _fb: FormBuilder
	) { }

	onChange = (_: any) => { };

	onTouch = () => { };

	writeValue(value: Array<{ id: number, name: string, canView: boolean, canEdit: boolean }>): void {
		if (value) {
			this.form.patchValue(value);
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((changes) => {
			this.onChange(this.form.value);
		});
	}

	uncheckCanEditControl(group: FormGroup) {
		if (!group.get('canView').value) {
			group.get('canEdit').patchValue(false);
		}
	}

	checkCanViewControl(group: FormGroup) {
		if (group.get('canEdit').value) {
			group.get('canView').patchValue(true);
		}
	}
}
