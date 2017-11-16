import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,
  githubWrapper: Ember.inject.service(),

  contentToSave: null,
  commitComment: null,
  successMessage: null,
  previousModel: null,

  cleanWhenChangeModel: Ember.observer('model', function () {
    if (Ember.isPresent(this.get('model'))) {
      this.cleanIt();
    }
  }),

  cleanIt() {
    this.set('commitComment', null);
    this.set('contentToSave', null);
    this.set('successMessage', null);
    this.set('previousModel', null);
    this.set('commitsList', []);
  },

  previousVersionDecodedContent: Ember.computed('previousModel.content', function () {
    return this.decodeContent(this.get('previousModel.content'));
  }),

  decodedContent: Ember.computed('model.content', function () {
    return this.decodeContent(this.get('model.content'));
  }),

  decodeContent(content) {
    if (Ember.isNone(this.get('content'))) {
      return '';
    }

    return atob(content)
  },

  isContentUpdated: Ember.computed('decodedContent', 'contentToSave', function () {
    return this.get('decodedContent') !== this.get('contentToSave');
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
        this.set('contentToSave', '');
        this.set('successMessage', 'Commit done');
      });
    },

    revert() {
      this.get('githubWrapper').postFileUpdate(this.get('model.path'), this.get('model.sha'), this.get('previousVersionDecodedContent'), `Revert to ${this.get('previousModel.sha')}`).then((updatedModel) => {
        this.set('commitComment', '');
        this.set('successMessage', 'Commit done');
        this.set('previousModel', null);
      });
    }
  }
});
