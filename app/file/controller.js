import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,
  contentToSave: null,
  githubWrapper: Ember.inject.service(),

  decodedContent: Ember.computed('model.content', function () {
    let res = atob(this.get('model.content'));
    return res;
  }),

  parentPath: Ember.computed('path', function () {
    if (Ember.isNone(this.get('path'))) {
      return;
    }

    let splittedPath = this.get('path').split('/');

    if (splittedPath.length === 1) {
      return '';
    }

    splittedPath.pop();
    return splittedPath.join("/");
  }),

  actions: {
    saveFileNewContent() {
      this.get('githubWrapper').postFileUpdate(this.get('model.path'), this.get('model.sha'), this.get('contentToSave'));
    }
  }
});
