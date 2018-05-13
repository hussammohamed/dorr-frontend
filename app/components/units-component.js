import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('currentUserId', this.get('session').authUserId())
    },
    actions:{
        rentAction(){
            
        },
        propertyView(){
            
        },
        editProperty(id){
            
        },
        addProperty(){
            
        }
    }
});
