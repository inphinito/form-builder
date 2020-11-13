import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const NormalizedCharsValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
	const regex = new RegExp(/^[A-Za-z0-9_]+$/g);

	return regex.test(control.value) ? null : { normalizedChars: true };
};
