import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const NormalizedCharsValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
	const regex = new RegExp(/[\s.]+/g);

	return regex.test(control.value) ? { normalizedChars: true } : null;
};
