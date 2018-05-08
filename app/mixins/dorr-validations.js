import Mixin from '@ember/object/mixin';

export default Mixin.create({
    regularValidation: {
        "required":"هذا الحقل إلزامي ."
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
});
