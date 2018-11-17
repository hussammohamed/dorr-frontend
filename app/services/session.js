import Ember from 'ember';
import ENV from '../config/environment';
import Cookies from 'ember-cli-js-cookie';


export default Ember.Service.extend({
    intl: Ember.inject.service(),
    store: Ember.inject.service(),
    manager: Ember.inject.service(),
    isAuthorized(permission) {
        return Ember.$.inArray(permission, this.getUserPermissions());
    },
    deleteUserSession() {
        let domain = ENV.orginDomain;
        this.redirectToLogin();
        Cookies.remove('userId', { domain: domain });
        Cookies.remove('token', { domain: domain });
        Cookies.remove('dorr_session', { domain: domain });
        
    },
    getMainUrl(){
        return ENV.mainUrl;
    },
    authToken() {
        return Cookies.get('token');
    },
    authUserId(){
        return true;
    },
    ensureAuthenticated() {
        if (this.authToken()) {
            return true;
        } else {
            this.redirectToLogin();
        }
    },
    getHospitalAdminId() {
        return Cookies.get('userHospitalId');
    },
    getUserData() {
        return { 'user': { 'name': Cookies.get('userName'), 'email': Cookies.get('userEmail'), 'avarar': Cookies.get('avatar') } }
    },
    checkUserLoginStatus() {
        if (this.authToken() && this.authSessionId()) {
            return true;
        } else {
            return false;
        }
    },
    redirectToLogin() {
        window.location.href = ENV.mainUrl + "/logout-session";
    },
    redirectToCorrectRoute() {
        if (this.authToken() && this.authUserId()) {
            window.location.href = ENV.domainUrl + '/properties';
        } else {
            this.redirectToLogin();
        }

    },
    getCurrentLanguage() {
        return this.get('intl').get('locale');
    },
    setLanguageSetting() {
        if (Cookies.get('currentLanguage')) {
            this.get('intl').setLocale(Cookies.get('currentLanguage'));
        } else {
            this.get('intl').setLocale('en');
            Cookies.set('currentLanguage', "en");
        }

        this.changeAssets(this.get('intl').get('locale'));
    },
    changeAssets(language) {
        if (language == "en" || language == "es") {
            Ember.$("html").attr("dir", 'ltr');
        } else {
            Ember.$("html").attr("dir", 'rtl');
        }
    },
    switchLanguage(lang) {
        Cookies.set('currentLanguage', lang);
        this.get('intl').setLocale(lang);
        this.changeAssets(this.get('intl').get('locale'));
        window.location.href = window.location.href;
    },
});