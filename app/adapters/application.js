import ActiveModelAdapter from 'active-model-adapter';
import ENV from "../config/environment";
import Ember from 'ember';
export default ActiveModelAdapter.extend({
    session: Ember.inject.service(),
    intl: Ember.inject.service(),
    host: ENV.host,
    coalesceFindRequests: false,
    headers: Ember.computed(function() {
        return {
            "token": this.get('session').authToken(),
        };
    }).volatile(),
    // Scope all ajax calls.
    ajax: function(url, type, hash) {
        if (Ember.isEmpty(hash)) { hash = {}; }
        if (Ember.isEmpty(hash.data)) { hash.data = {}; }
        // hash.data.lang = this.get('intl').get('locale')[0];
        return this._super(url, type, hash);
    }
});