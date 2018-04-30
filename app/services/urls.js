import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
    intl: Ember.inject.service(),
    user: ENV.hostOuth + "/user",
    mproperty:"/mproperties" ,
    getUrl: function(path) {
        return ENV.host + this.get(path) + "?lang=" + this.get('intl').get('locale');
    },  
});