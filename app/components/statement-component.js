import Component from '@ember/component';

export default Component.extend({
    actions:{
        addTransferRequest(){
            this.get('router').transitionTo('index.properties.show.statements.transfer-request')
        },
        addWithdraw(){
            this.get('router').transitionTo('index.properties.show.statements.withdraw-request')
        },
       detailsStatement(){
        this.get('router').transitionTo('index.properties.show.statements.details-statement')
       }
    }
});
