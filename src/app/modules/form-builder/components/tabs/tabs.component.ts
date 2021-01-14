import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tabs } from '../../interfaces/tabs';
import { TranslationService } from '../../services/translation.service';
import { NormalizedCharsValidator } from '../../validators/normalized-chars.validator';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

	@Input() value: Tabs;

	roles: Array<{ id: number, name: string }>;

	get properties(): FormArray { return this.form.get('properties') as FormArray; }

	form = this._formBuilder.group({
		type: ['tabs'],
		properties: this._formBuilder.array([]),
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
			this.value.properties.forEach(o => this.add(o));
			this.form.patchValue(this.value);
		} else {
			this.add();
		}
	}

	add(value: any = {}): void {
		const properties = this.form.get('properties') as FormArray;
		properties.push(
			this._formBuilder.group({
				type: ['tab'],
				description: [value.description, Validators.required],
				key: [null, [Validators.required, NormalizedCharsValidator]],
				iconClass: [value.iconClass],
				properties: [value.properties || []]
			})
		);
	}

	removeByIndex(index: number) {
		const properties = this.form.get('properties') as FormArray;
		const property = properties.at(index);
		if (property.get('properties').value.length && !confirm('La pestaña tiene propiedades. ¿Desea continuar?')) {
			return;
		}
		properties.removeAt(index);
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
