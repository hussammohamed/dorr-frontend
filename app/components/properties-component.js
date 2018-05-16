import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('currentUser', this.get('currentUser'))
        this.set('tableLoading', true);
        this.store.findAll('MProperty').then(
            success => {
                this.set('tableLoading', false)
                this.set('properties', success)
            }
        );
    },
    actions:{
        rentAction(){
            
        },
        propertyView(id){
            this.get('router').transitionTo('index.properties.show.property-data', id)
        },
        editProperty(id){
            this.get('router').transitionTo('index.properties.edit.status', id)
        },
        addProperty(){
            this.get('router').transitionTo('index.properties.add.property-data')
        }
    }
});
