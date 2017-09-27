import { FormControl } from '@angular/forms';

export class GlobalValidator{

    static mailFormat(control: FormControl): ValidationResult {

        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }

        return null;
    }

    static phoneFormat(control: FormControl): ValidationResult {

      var TELEFONE_REGEXP = /^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/;

      if(control.value != "" && (control.value.length <=10 || TELEFONE_REGEXP.test(control.value))){
        return { "incorrectPhoneFormat": true };
      }

      return null;
    }

}

interface ValidationResult {
    [key: string]: boolean;
}
