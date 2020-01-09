import { Component, Input, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TableCodeComponent } from '../table-code/table-code.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
	@Input() value: any;
	@ViewChild('table', { static: false }) table: ElementRef;

	form: FormGroup = this._formBuilder.group({
		name: [null, Validators.required]
	});
	columns: any[] = [];

	constructor(
		public _activeModal: NgbActiveModal,
		private _formBuilder: FormBuilder,
		private _changeDetectorRef: ChangeDetectorRef,
		private _modalService: NgbModal
	) { }

	ngAfterViewInit() {
		if (this.value) {
			this.form.patchValue(this.value);
			this.columns = this.value.value.length ? this.value.value : [];
		}

		this._changeDetectorRef.detectChanges();
	}

	addOption() {
		const nCols = this.columns.length;

		if (!nCols || (this.columns[nCols - 1].name.length && this.columns[nCols - 1].label.length)) {
			this.columns.push({
				name: '',
				label: '',
				type: 'text',
				code: '',
			});
			setTimeout(() => {
				this.table.nativeElement.scrollTop = this.table.nativeElement.scrollHeight;
			}, 1);
		}
	}

	async addCode(column: any) {
		try {
			const modalRef: NgbModalRef = this._modalService.open(TableCodeComponent, { size: 'lg' });

			column.code = await modalRef.result;
		} catch (error) {
			console.log(error);
		}
	}

	async editCode(column: any) {
		try {
			const modalRef: NgbModalRef = this._modalService.open(TableCodeComponent, { size: 'lg' });

			modalRef.componentInstance.value = column.code;
			column.code = await modalRef.result;
		} catch (error) {
			console.log(error);
		}
	}

	delete(index: number) {
		this.columns.splice(index, 1);
	}

	save() {
		if (this.columns.length) {
			const value = this.form.value;

			value.value = this.columns;
			this._activeModal.close(value);
		}
	}

	cancel() {
		this._activeModal.dismiss();
	}
}
