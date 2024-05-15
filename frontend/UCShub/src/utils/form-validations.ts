import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn,
  } from '@angular/forms';
  
  export class FormValidations {
  
  
    static equalsTo(otherField: string) {
      const validator: ValidatorFn = (formControl: AbstractControl) => {
        if (formControl instanceof FormControl) {
          if (otherField == null) {
            throw new Error();
          }
          // Colocamos essa validação abaixo para sabermos se o Angular já preparou esses
          // componentes na renderização. Muitas vezes o objeto vem null por esse motivo,
          // ou seja, as vezes o Angular precisa de um tempinho a mais.
          if (!formControl.root || !(<FormGroup>formControl.root).controls) {
            return null;
          }
          // Também poderíamos utilizar a propriedade .parent do formControl,
          // porém, para garantir, vamos utilziar a root (raiz).
          const field = (<FormGroup>formControl.parent).get(otherField);
  
          if (!field) {
            throw new Error();
          }
  
          if (field.value !== formControl.value) {
            // Aqui a validação propriamente feita, onde se não forem iguais, retornamos um erro.
            // Precisamos retornar um objeto com a propriedade de erro com seu nome, no caso
            // usamos o nome sendo equalsTo.
            return { equalsTo: otherField };
          }
  
          return null;
        }
        throw new Error();
      };
      return validator;
    }
  
    static CPF(cpfForm: FormControl) {
  
      let cpf = cpfForm.value
  
      //#region verificação inicial
  
      if (!cpf) {
        return null;
      }
  
      if (cpf.length != 11) {
        return { cpfInvalido: true };
      }
  
      let todosIguais: boolean;
  
      for (let nro = 0; nro < 10; nro++) {
        todosIguais = true;
  
        for (let i = 0; i < 11; i++) {
          if (parseInt(cpf[i]) != nro) {
            todosIguais = false;
            break;
          }
  
        }
  
        // se todos os dígitos forem iguais
        // o cpf não é válido
        if (todosIguais) {
  
          return { cpfInvalido: true };
        }
  
      }
  
      //#endregion
  
  
      //#region primeira parte (1º dígito verificador)
  
      let somaDig = 0;
      for (let i = 10; i > 1; i--) {
        somaDig += parseInt(cpf[10 - i]) * i;
      }
  
      let digVerificacao = somaDig * 10 % 11;
      if (digVerificacao > 9) {
        digVerificacao = 0;
      }
  
      if (digVerificacao != parseInt(cpf[9])) {
        return { cpfInvalido: true };
      }
  
      //#endregion
  
  
      //#region segunda parte (2º dígito verificador)
      somaDig = 0;
      for (let i = 11; i > 1; i--) {
        somaDig += parseInt(cpf[11 - i]) * i;
      }
  
      digVerificacao = somaDig * 10 % 11;
      if (digVerificacao > 9) {
        digVerificacao = 0;
      }
  
      if (digVerificacao != parseInt(cpf[10])) {
        return { cpfInvalido: true };
      }
  
      //#endregion
  
  
      return null;
  
    }
  
    static CNPJ(cnpjForm: FormControl) {
  
      let cnpj = cnpjForm.value
  
      //#region verificação inicial
  
      if (!cnpj) {
  
        return null;
      }
  
      if (cnpj.length != 14) {
  
        return null;
      }
  
      let todosIguais: boolean;
  
      for (let nro = 0; nro < 12; nro++) {
        todosIguais = true;
  
        for (let i = 0; i < 11; i++) {
          if (parseInt(cnpj[i]) != nro) {
            todosIguais = false;
            break;
          }
  
        }
  
        // se todos os dígitos forem iguais
        // o cnpj não é válido
        if (todosIguais) {
  
          return { cnpjInvalido: true };
        }
  
      }
  
      // Valida DVs
  
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return { cnpjInvalido: true };
  
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return { cnpjInvalido: true };
  
      return null;
    }
  
    static validaDataNascimento(dataForm: FormControl) {
  
      let hoje: Date = new Date();
  
      if (new Date(dataForm.value) > hoje) {
        return { "dataNascimentoInvalido": true };
      }
      return null;
    }
  
    static DDD(formData: FormControl) {
  
      let dddBR = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"]
  
      if (formData.value) {
  
        if (!dddBR.includes(formData.value.slice(0, 2))) {
          return { "dddInvalido": true }
        }
  
      }
      return null;
  
    }
  
    static getErrorMessage(campoName: string, campo: string, formulario: any) {
      let campoErro = formulario.get(campoName);
  
      if (campoErro?.errors) {
        if (campoErro?.errors['required']) {
  
          return campo + ' é campo obrigatório';
        }
        if (campoErro?.errors['email']) {
  
          return campo + ' inválido ';
        }
        if (campoErro?.errors['equalsTo']) {
  
          return 'Deve ser igual à ' + campoErro?.errors['equalsTo'];
        }
        if (campoErro?.errors['emailInvalido']) {
  
          return 'Email já cadastrado';
        }
        if (campoErro?.errors['cpfInvalido']) {
          return 'CPF inválido';
        }
        if (campoErro?.errors['cnpjInvalido']) {
          return 'CNPJ inválido';
        }
        if (campoErro?.errors['dataNascimentoInvalido']) {
          return 'Data de nascimento inválida';
        }
        if (campoErro?.errors['max']) {
          return 'Valor máximo excedido';
        }
        if (campoErro?.errors['min']) {
          return 'Valor mínimo excedido';
        }
        if (campoErro?.errors['dddInvalido']) {
          return 'DDD inválido';
        }
        if (campoErro?.errors['mask']) { //cuidar com outras mascaras no sistema.
          return 'Formato inválido';
        }
        if (campoErro?.errors['pattern']) {
          return 'A senha deve conter no mínimo 8 caracteres com letra minúscula, maiúscula, número e caracter especial';
        }
      }
      return '';
    }

    static checkValidity(formulario: FormGroup): boolean{
      if (!formulario.valid) {
        Object.keys(formulario.controls).forEach((campo) => {
          const controle = formulario.get(campo);
          controle?.markAsDirty;
        });

        return false;

      }

      return true;

    }
  
    //#region util for angular forms
  
    static triggerValidation(control: AbstractControl) {
      if (control instanceof FormGroup) {
        const group = (control as FormGroup);
  
        for (const field in group.controls) {
          const c = group.controls[field];
  
          this.triggerValidation(c);
        }
      }
      else if (control instanceof FormArray) {
        const group = (control as FormArray);
  
        for (const field in group.controls) {
          const c = group.controls[field];
  
          this.triggerValidation(c);
        }
      }
      control.markAsDirty({ onlySelf: false });
      control.markAsTouched({ onlySelf: false });
      control.updateValueAndValidity({ onlySelf: false });
    }
  
    //#endregion
  }
  