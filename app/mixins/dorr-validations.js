import Mixin from '@ember/object/mixin';

export default Mixin.create({
    regularValidation: {
        "required":"هذا الحقل إلزامي .",
        "maxlength": "يجب ان لا يكون اكبر من ٢٤ رقم ",
        "minlength": "يجب ان لا يكون اقل من ٢٤ رقم",

    },
    emailValidation: [{
        message: 'من فضلك أدخل بريد ألكتروني صحيح .',
        validate: (inputValue) => {
          let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!inputValue){
            return true;
        }else{
            return emailPattern.test(inputValue);
        }
          
        }
      }],
      ibanValidation: [{
        message: 'يجب ان يكون ٢٤ رقم ',
        validate: (inputValue) => {
          let iban = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!inputValue){
            return true;
        }else{
            return iban.test(inputValue);
        }
          
        }
      }],
});
