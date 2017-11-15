import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,

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
  })
});
