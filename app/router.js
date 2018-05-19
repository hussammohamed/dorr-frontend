import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' }, function() {
    this.route('properties', function() {
      this.route('add', function() {
        this.route('property-data', {path: '/data'});
      });
      this.route('property-status', {path: ':id/status'});

      this.route('edit', {path: ':id/edit'}, function() {
        this.route('property-data', {path: '/data'});
        this.route('owner');
        this.route('agent');
        this.route('agency');
        this.route('add-unit', {path: '/units/add'});
        this.route('status');
      });
      this.route('show', {path: ':id'}, function() {
        this.route('property-data', {path: '/data'});
        this.route('units', function() {
          this.route('unit-show', {path: '/:unit_id'});
          this.route('unit-add', {path: '/add'});
          this.route('unit-edit', {path: '/:unit_id/edit'});
        });
        this.route('maintenance-requests', function() {
          this.route('pending');
          this.route('history');
        });
        this.route('collection-requests', function() {
          this.route('pending');
          this.route('history');
        });
        this.route('contracts');
      });
    });
  });
});
Router.reopen({
  doSomethingOnUrlChange: function() {
    let app = document.getElementById('app');
    if(app){
      app.scrollTop = 0;
    }
    
  }.on('didTransition')
});
export default Router;
