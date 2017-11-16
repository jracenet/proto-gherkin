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

  postFileUpdate(filePath, fileSha, newContent, comment) {
    let encodedNewContent = btoa(newContent),
        fileName = filePath.split("/").get('lastObject'),
        commitComment = comment || `Update ${fileName} via gherkin-editor`;

    return this.get('githubAjax').put(`/repos/jracenet/hps-behat/contents/${filePath}`, {
      data: {
        "path": filePath,
        "message": commitComment,
        "content": encodedNewContent,
        "sha": fileSha
      }
    });
  },

  getHistoryForFile(filePath) {
    return this.get('githubAjax').request(`/repos/jracenet/hps-behat/commits`, {
      data: {
        "path": filePath
      }
    }).then((data) => {
      return data;
    })
  }

});
