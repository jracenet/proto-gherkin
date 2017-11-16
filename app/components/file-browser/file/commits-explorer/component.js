import Ember from 'ember';

export default Ember.Component.extend({
  loadCommits: Ember.on('didInsertElement', function () {
    this.sendAction('loadCommitsAction', this.get('model.path'));
  })
});
