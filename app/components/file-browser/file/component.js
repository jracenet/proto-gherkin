import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",

  canBeEdited: Ember.computed('model.path', function () {
    return this.get('model.path').endsWith('.feature');
  })
});
