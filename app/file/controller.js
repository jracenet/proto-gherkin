import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,
  githubWrapper: Ember.inject.service(),
  
  contentToSave: null,
  commitComment: null,
  successMessage: null,

  cleanIt() {
    this.set('commitComment', null);
    this.set('contentToSave', null);
    this.set('successMessage', null);
  },

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
      this.get('githubWrapper').postFileUpdate(this.get('model.path'), this.get('model.sha'), this.get('contentToSave'), this.get('commitComment')).then((updatedModel) => {
        this.set('commitComment', '');
        this.set('successMessage', 'Hell yeah! Commit done');
      });
    }
  }
});
