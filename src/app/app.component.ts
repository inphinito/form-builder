import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	schema: any;

	constructor(
		private _http: HttpClient
	) { }

	async ngOnInit() {
		const schemas = await this._http.get('./assets/examples.json').toPromise();
		this.schema = schemas[0];
	}
}
