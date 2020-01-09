import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildingItem } from '../../interfaces/building-item';
import { SectionComponent } from '../section/section.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SelectComponent } from '../select/select.component';
import { CodeComponent } from '../code/code.component';
import { TableComponent } from '../table/table.component';
import { InputComponent } from '../input/input.component';

@Component({
	selector: 'form-builder',
	templateUrl: './form-builder.component.html',
	styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
	buildingItems: BuildingItem[] = [
		{ name: 'Fieldset', children: [] as any[], type: 'fieldset', icon: 'fa fa-square', properties: { value: null } },
		// { name: 'Row', children: [] as any[], type: 'row', icon: 'fa fa-square', properties: { value: null} },
		// { name: 'Col', children: [] as any[], type: 'col', icon: 'fa fa-square', properties: { value: null} },
		{ name: 'Input', type: 'string', icon: 'fa fa-language', properties: { value: null } },
		{ name: 'TextArea', type: 'textarea', icon: 'fa fa-language', properties: { value: null } },
		{ name: 'Select', type: 'select', icon: 'fa fa-language', properties: { value: null } },
		{ name: 'Código', type: 'code', icon: 'fa fa-language', properties: { value: null } },
		// { name: 'Tabla', type: 'table', icon: 'fa fa-hashtag' }
	];
	tabIndex = 0;

	private _schema: any;
	@Output() schemaChange = new EventEmitter();
	get schema(): any {
		return this._schema;
	}
	@Input() set schema(v: any) {
		this._schema = v;
		this.schemaChange.emit(v);
	}

	constructor(
		private _modalSvc: NgbModal
	) { }

	ngOnInit() {
		this.initialize();
	}

	async initialize() { }

	async save() {
		try {
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Evento lanzado cuando se deja el item en su lugar. Si es un movimiento, elimina el elemento de la posición inicial
	 *
	 * @param {*} item
	 * @param {any[]} list
	 * @param {DropEffect} effect
	 */
	onDragged(item: any, list: any[], effect: DropEffect) {
		console.log(`Drag ended with effect '${effect}'!`);
		if (effect === 'move') {
			const index = list.indexOf(item);
			list.splice(index, 1);
		}
	}

	/**
	 * Evento lanzado finalmente que añade el elemento en la posición indicada
	 *
	 * @param {DndDropEvent} event
	 * @param {any[]} [list]
	 */
	onDrop(event: DndDropEvent, list?: any[]) {
		if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {

			let index = event.index;

			if (typeof index === 'undefined') {

				index = list.length;
			}

			list.splice(index, 0, event.data);
		}
	}

	// addTab() {
	// 	this.template.schema.push({
	// 		name: 'Tab ' + (this.template.schema.length + 1),
	// 		properties: []
	// 	});
	// 	this.tabIndex = this.template.schema.length - 1;
	// }

	async editBuildItem(item: any) {
		let modalRef: NgbModalRef;

		try {
			switch (item.type) {
				case 'fieldset':
					modalRef = this._modalSvc.open(SectionComponent);
					break;
				case 'textarea':
					modalRef = this._modalSvc.open(TextAreaComponent);
					break;
				case 'select':
					modalRef = this._modalSvc.open(SelectComponent, { size: 'lg' });
					break;
				case 'code':
					modalRef = this._modalSvc.open(CodeComponent);
					break;
				case 'table':
					modalRef = this._modalSvc.open(TableComponent, { size: 'lg' });
					break;
				default:
					modalRef = this._modalSvc.open(InputComponent);
					break;
			}

			if (item.properties) {
				modalRef.componentInstance.value = item.properties;
			}

			const result = await modalRef.result;
			item.properties = result;
		} catch (error) {
			console.log(error);
		}
	}


	deleteBuildItem(list: any[], item: object): void {
		const index = list.indexOf(item);
		if (confirm('¿Desea eliminar el elemento?')) {
			if (index > -1) {
				list.splice(index, 1);
			}
		}
	}
}
