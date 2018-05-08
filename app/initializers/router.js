export function initialize(application) {
  application.inject('route', 'router', 'router:main');
  application.inject('route', 'intl', 'service:intl');
  application.inject('route', 'session', 'service:session');
  application.inject('route', 'urls', 'service:urls');
  application.inject('route', 'paperToaster', 'service:paperToaster');
  application.inject('component', 'intl', 'service:intl');
  application.inject('component', 'session', 'service:session');
  application.inject('component', 'urls', 'service:urls');
  application.inject('component', 'paperToaster', 'service:paperToaster');
  application.inject('component', 'store', 'service:store');
  application.inject('component', 'manager', 'service:manager');
  application.inject('component', 'dorrValidations', 'service:dorrValidations');

}

export default {
  name: 'router',
  initialize
};