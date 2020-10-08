import { Component, forwardRef, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildingItem } from '../../interfaces/building-item';
import { FieldsetComponent } from '../fieldset/fieldset.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { SelectComponent } from '../select/select.component';
import { CodeComponent } from '../code/code.component';
import { TableComponent } from '../table/table.component';
import { InputComponent } from '../input/input.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { FileComponent } from '../file/file.component';
import { EnrichedTextComponent } from '../enriched-text/enriched-text.component';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
	selector: 'form-builder',
	templateUrl: './form-builder.component.html',
	styleUrls: ['./form-builder.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormBuilderComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => FormBuilderComponent),
			multi: true,
		}
	]
})
export class FormBuilderComponent implements ControlValueAccessor, Validator, AfterViewInit {

	@ViewChild('buildingToolbar') toolbarElement: ElementRef;

	buildingItems: BuildingItem[] = [
		{ name: 'tabs', children: [] as any[], type: 'tabs', icon: 'assets/icons/segmented-nav.svg' },
		{ name: 'Fieldset', children: [] as any[], type: 'fieldset', icon: 'assets/icons/slash-square.svg' },
		{ name: 'Input', type: 'string', icon: 'assets/icons/input.svg' },
		{ name: 'Select', type: 'select', icon: 'assets/icons/menu-button-wide.svg' },
		{ name: 'Textarea', type: 'textarea', icon: 'assets/icons/textarea-resize.svg' },
		{ name: 'Table', type: 'table', icon: 'assets/icons/table.svg' },
		{ name: 'File', type: 'file', icon: 'assets/icons/file-earmark.svg' },
		{ name: 'Enriched Text', type: 'enriched-text', icon: 'assets/icons/code.svg' },
	];

	buildingItemsToShow: BuildingItem[];

	sticky: boolean = false;
	elementPosition: any;

	tabIndex = 0;

	defaultSchema: any = {
		$id: null,
		$schema: 'http://json-schema.org/draft-07/schema#',
		title: null,
		type: 'object',
		properties: []
	};

	schema: any;

	disabled: boolean = false;

	onTouch = () => { }

	constructor(
		private _modalSvc: NgbModal,
		private _configSvc: FormBuilderService
	) {
		this.buildingItemsToShow = this.buildingItems.filter(o =>
			this._configSvc.config.components.findIndex(p => o.type === p) > -1
		);
	}

	ngAfterViewInit() {
		this.elementPosition = this.toolbarElement.nativeElement.offsetTop;
	}

	/**
	 * The method set in registerOnChange, it is just a placeholder for a method that takes one parameter,
	 * we use it to emit changes back to the form
	 * @private
	 * @memberof FormBuilderComponent
	 */
	private propagateChange = (_: any) => { };

	// this is the initial value set to the component
	public writeValue(obj: any) {
		if (obj) {
			this.schema = obj;
			this.onChange(this.schema);
		}
	}

	/**
	 * Registers a callback function that is called when the control's value changes in the UI.
	 *
	 * @param {*} fn The callback function to register
	 */
	public registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	/**
	 * Registers a callback function is called by the forms API on initialization to update the form model on blur.
	 *
	 * @param {*} fn The callback function to register
	 *
	 */
	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * This function is called when the control status changes to or from "DISABLED".
	 * Depending on the value, it will enable or disable the appropriate DOM element.
	 * @param isDisabled
	 */
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}


	// returns null when valid else the validation object 
	// in this case we're checking if the json parsing has 
	// passed or failed from the onChange method
	public validate(c: FormControl) {
		return null;
	}

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
	async onDrop(event: DndDropEvent, list?: any[]) {
		if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {

			let index = event.index;
			if (typeof index === 'undefined') {
				index = list.length;
			}

			if (event.dropEffect === 'copy') {
				event.data = await this.newBuildingItem(event.data.type);
				if (!event.data) {
					return;
				}
			}

			list.splice(index, 0, event.data);

			this.onTouch();

			// update the form
			this.propagateChange(this.schema);
		}
	}

	async newBuildingItem(type: string) {
		const modalRef = this.getModalRefByKey(type);
		try {
			return await modalRef.result;
		} catch (error) {
			console.log(error);
		}
	}

	async editBuildItem(list: any[], item: any) {
		const index = list.indexOf(item);
		const modalRef = this.getModalRefByKey(item.type);
		try {
			modalRef.componentInstance.value = item;
			const result = await modalRef.result;
			if (result) {
				list[index] = result;
				this.onTouch();
			}
		} catch (error) {
			console.log(error);
		}
	}

	getModalRefByKey(key: string): NgbModalRef {
		let modalRef: NgbModalRef;
		switch (key) {
			case 'string':
				modalRef = this._modalSvc.open(InputComponent, { size: 'lg' });
				break;
			case 'file':
				modalRef = this._modalSvc.open(FileComponent, { size: 'lg' });
				break;
			case 'tabs':
				modalRef = this._modalSvc.open(TabsComponent, { size: 'lg' });
				break;
			case 'fieldset':
				modalRef = this._modalSvc.open(FieldsetComponent, { size: 'lg' });
				break;
			case 'textarea':
				modalRef = this._modalSvc.open(TextAreaComponent, { size: 'lg' });
				break;
			case 'select':
				modalRef = this._modalSvc.open(SelectComponent, { size: 'lg' });
				break;
			case 'code':
				modalRef = this._modalSvc.open(CodeComponent, { size: 'lg' });
				break;
			case 'table':
				modalRef = this._modalSvc.open(TableComponent, { size: 'lg' });
				break;
			case 'enriched-text':
				modalRef = this._modalSvc.open(EnrichedTextComponent, { size: 'lg' });
				break;
			default:
				modalRef = this._modalSvc.open(InputComponent, { size: 'lg' });
				break;
		}
		return modalRef;
	}

	deleteProperty(list: any[], item: object): void {
		const index = list.indexOf(item);
		if (confirm('Do you want to delete the item?')) {
			if (index > -1) {
				list.splice(index, 1);
				this.onTouch();
			}
		}
	}

	cloneProperty(list: any[], item: object): void {
		const index = list.indexOf(item);
		if (index > -1) {
			list.splice(index + 1, 0, Object.assign({}, item));
			this.onTouch();
		}
	}

	tabClick(tabs, tab) {
		const index = tabs.properties.indexOf(tab);
		tabs.index = index;
	}

	onChange(event) {
		this.propagateChange(event);
	}

	getFormControlPaths() {
		// const result = Object.keys(this.form).reduce(function (r, k) {
		// 			return r.concat(k, object[k]);
		// 		}, []);

		// 	console.log(result);
	}

	@HostListener('window:scroll', ['$event'])
	handleScroll() {
		const windowScroll = window.pageYOffset;
		if (windowScroll >= this.elementPosition) {
			this.sticky = true;
		} else {
			this.sticky = false;
		}
	}

}
