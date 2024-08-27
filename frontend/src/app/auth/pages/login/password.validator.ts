import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) { return null; }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const errors: ValidationErrors = {};

  if (!hasUpperCase) errors['missingUppercase'] = true;
  if (!hasNumber) errors['missingNumber'] = true;
  if (!hasSpecialChar) errors['missingSpecialChar'] = true;

  return Object.keys(errors).length ? errors : null;
}
