import Ember from 'ember';

import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://api.github.com',
  session: Ember.inject.service(),

  headers: Ember.computed('session.session.content.authenticated.access_token', {
    get() {
      let headers = {};
      const authToken = this.get('session').session.content.authenticated.access_token;

      if (authToken) {
        headers['Authorization'] = "token " + authToken;
        headers['Content-Type'] = 'application/vnd.api+json';
      }
      return headers;
    }
  })
});
