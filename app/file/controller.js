import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['path'],
  path: null,

  decodedContent: Ember.computed('model.content', function () {
    let res = atob(this.get('model.content'));
    let formattedLine;

    let txt = res.split("\n").map((line) => {
      formattedLine = line.replace("\t", '');
      formattedLine = formattedLine.replace(/^\s+/, "");

      if (formattedLine.startsWith("\\#")) {
        let titleLevel = formattedLine.split("\\#"),
            buildedTitle = "";

        for (let titleIndex = 1; titleIndex <= titleLevel.length - 1; titleIndex++) {
          buildedTitle += "#";
        }

        formattedLine = buildedTitle + titleLevel[titleLevel.length - 1];
      }

      // The 2 white spaces added at the end of each line are to preserve
      // new-lines character on non-markdown descriptions
      return (formattedLine + '  ');
    });

    return txt.join("\n");
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
