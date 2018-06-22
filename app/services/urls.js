import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
    intl: Ember.inject.service(),
    user: ENV.hostOuth + "/user",
    mproperty:"/mproperties" ,
    searchUser: "/users/search",
    users: "/users",
    agencies: "/agencies",
    getFormData: "/forms/getFormData",
    units: "/units",
    getUrl: function(path) {
        return ENV.host + this.get(path) + "?lang=" + this.get('intl').get('locale');
    },
    updateUser(id){
        return ENV.host + "/users/" + id;
    },
    updateProperty(id){
        return ENV.host + "/mproperties/" + id + "?lang=" + this.get('intl').get('locale');
    },
    updateAgency(id){
        return ENV.host + "/agencies/" + id + "?lang=" + this.get('intl').get('locale');
    },
    updateUnit(id){
        return ENV.host + "/units/" + id + "?lang=" + this.get('intl').get('locale');
    },
    saveContract(){
        return ENV.host + "/contracts" + "?lang=" + this.get('intl').get('locale');
    },
    getContractsByMproperty(mpropertyId){
        return ENV.host +"/mproperties/" + mpropertyId + "/contracts" + "?lang=" + this.get('intl').get('locale');
    },
    getContrarct(contract_id){
        return ENV.host + "/contracts/" + contract_id + "?lang=" + this.get('intl').get('locale');
    },
    changeContractStatus(id, value){
        return ENV.host + "/contracts/" + id + "/status/" + value + "?lang=" + this.get('intl').get('locale');
    },
    saveMaintenance(){
        return ENV.host + "/maintenances" + "?lang=" + this.get('intl').get('locale'); 
    }


});