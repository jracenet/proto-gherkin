import Ember from 'ember';

export default Ember.Service.extend({

  githubAjax: Ember.inject.service(),

  getLastCommit() {
    return this.get('githubAjax').request('/repos/jracenet/hps-behat/commits').then((data) => {
      return data.get('firstObject');
    })
  },

  getContents(path) {
    return this.get('githubAjax').request(`/repos/jracenet/hps-behat/contents/${path}`).then((data) => {
      return data;
    })
  },

  postFileUpdate(filePath, fileSha, newContent) {
    let encodedNewContent = btoa(newContent);
    return this.get('githubAjax').put(`/repos/jracenet/hps-behat/contents/${filePath}`, {
      data: {
        "path": filePath,
        "message": "Commit from gherkin-editor",
        "content": encodedNewContent,
        "sha": fileSha
      }
    });
  }

});
