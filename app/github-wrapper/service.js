import Ember from 'ember';

export default Ember.Service.extend({
  githubURL: 'https://api.github.com',

  ajax: Ember.inject.service(),

  getLastCommit() {
    return this.get('ajax').request(this.get('githubURL') + '/repos/jracenet/hps-behat/commits').then((data) => {
      return data.get('firstObject');
    })
  },

  getContents(path) {
    return this.get('ajax').request(this.get('githubURL') + `/repos/jracenet/hps-behat/contents/${path}`).then((data) => {
      return data;
    })
  }

});
