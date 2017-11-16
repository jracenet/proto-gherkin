import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('file-browser/file/commits-explorer', 'Integration | Component | file browser/file/commits explorer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{file-browser/file/commits-explorer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#file-browser/file/commits-explorer}}
      template block text
    {{/file-browser/file/commits-explorer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
