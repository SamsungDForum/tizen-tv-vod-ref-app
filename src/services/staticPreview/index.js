/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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