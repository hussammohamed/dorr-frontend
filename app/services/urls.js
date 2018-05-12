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
        return ENV.host + "/users/" + id + "?lang=" + this.get('intl').get('locale');
    },
    updateProperty(id){
        return ENV.host + "/mproperties/" + id + "?lang=" + this.get('intl').get('locale');
    },
    updateAgency(id){
        return ENV.host + "/agencies/" + id + "?lang=" + this.get('intl').get('locale');
    }


});