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

      this.route('edit', {path: ':id'}, function() {
        this.route('property-data', {path: '/data'});
        this.route('owner');
        this.route('agent');
        this.route('units', function() {
          this.route('add-unit', {path: '/add'} );
        });
      });
    });
  });
});

export default Router;
