import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(domains: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const email = control.value;
    if (email) {
      const domainValid = domains.some(domain => 
        new RegExp(`^[^@]+@${domain}$`).test(email)
      );
      if (!domainValid) {
        return { emailDomain: true };
      }
    }
    return null;
  };
}
