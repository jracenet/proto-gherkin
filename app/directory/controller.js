import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,
  directories: Ember.computed.filterBy('model', 'type', 'dir'),
  files: Ember.computed.filterBy('model', 'type', 'file'),

  parentPath: Ember.computed('path', function () {
    if (Ember.isNone(this.get('path'))) {
      return;
    }

    let splittedPath = this.get('path').split('/');

    debugger
    if (splittedPath.length === 1) {
      return '';
    }

    return splittedPath[splittedPath.length - 2];
  })
});
