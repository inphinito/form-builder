import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	schema: any;
	reactiveForm = this._formBuilder.group({
		schema: [null]
	});

	roles: Array<{ id: number, name: string }> = [{
		id: 1,
		name: 'super',
	}, {
		id: 2,
		name: 'admin',
	}, {
		id: 3,
		name: 'supervisor',
	}, {
		id: 4,
		name: 'technician',
	}];

	constructor(
		private _http: HttpClient,
		private _formBuilder: FormBuilder
	) { }

	async ngOnInit() {
		const schemas = await this._http.get('./assets/examples.json').toPromise();
		this.schema = schemas[0];
		this.reactiveForm.get('schema').patchValue(schemas[0]);
	}

	toggleDisable() {
		if (this.reactiveForm.enabled) {
			this.reactiveForm.disable();
		} else {
			this.reactiveForm.enable();
		}
	}

	onChange(event) {
		console.log(event);
	}
}
