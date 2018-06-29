import Component from '@ember/component';

export default Component.extend({
    didRender(){
        this.set('currentRouteName', this.router.currentRouteName)
       
    },
    didInsertElement() {
        let currentUserID = this.get('currentUser').id
        let ownerId = this.get("property").get('owner').get('id')
        let agentId = this.get('property').get('agent').get('id')
        if(currentUserID == ownerId || currentUserID == agentId){
            this.set('isNotRenter', true);
        }else{
            this.set('isNotRenter', false);
        }
    },
    actions:{
        addRequest(){
            this.get('router').transitionTo('index.properties.show.maintenance-requests.add')
        }
    }

});
