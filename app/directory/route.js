import Ember from 'ember';

export default Ember.Route.extend({
  githubWrapper: Ember.inject.service(),

  queryParams: {
    path: {
      refreshModel: true
    }
  },

  model(params) {
    return this.get('githubWrapper').getContents(params.path || '').then((data) => {
      return data;
    });
  }
});
