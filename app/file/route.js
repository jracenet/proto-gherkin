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
  },

  resetController(controller, isExiting, transition) {
     if (isExiting) {
       controller.set('path', null);
       controller.cleanIt();
     }
   },

   actions: {
     fetchVersionsOfFile(filePath) {
       this.get('githubWrapper').getHistoryForFile(filePath).then((commits) => {
          this.controller.set('commitsList', commits);
        });
      },

      fetchVersionOfFile(filePath, sha) {
        this.get('githubWrapper').getContents(filePath, sha).then((data) => {
          this.controller.set('previousModel', data);
        });
      }
   }
});
