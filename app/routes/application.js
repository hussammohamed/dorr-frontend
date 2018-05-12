import Route from '@ember/routing/route';
import ENV from '../config/environment';
export default Route.extend({
    afterModel(){
        var location = window.location.href
        if((this.get('session').authToken()) && (location == ((ENV.domainUrl) + "/") )){
           
            this.get('session').redirectToCorrectRoute();
        }

    }
});