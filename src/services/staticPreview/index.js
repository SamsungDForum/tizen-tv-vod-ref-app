var fs = require('fs');
var path = require('path');

var JsonFilePath = 'defaultPreview.json';

module.exports.onStart = function() {
  fs.readFile(path.resolve(__dirname, JsonFilePath), 'utf8', function (error, data) {
    try {
      if (error) {
        throw error;
      }
      
      var previewData = JSON.parse(data);
      webapis.preview.setPreviewData(
        JSON.stringify(previewData),
        function () {
          tizen.application.getCurrentApplication().exit();
        },
        function (e) {
          tizen.application.getCurrentApplication().exit();
        }
      );
    } catch (e) {
      tizen.application.getCurrentApplication().exit();
    }
  });
}

module.exports.onRequest = function () {};


module.exports.onExit = function() {}