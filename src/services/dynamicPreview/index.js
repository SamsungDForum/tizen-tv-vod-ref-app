var fs = require('fs');
var path = require('path');

var portName = 'SAMPLE_PORT';
var localPort, portID;

function onReceived(previewData, remotePort) {
  var str = JSON.parse(previewData[0].value);

  webapis.preview.setPreviewData(
      JSON.stringify(str),
      function () {
        tizen.application.getCurrentApplication().exit();
      },
      function (e) {
        tizen.application.getCurrentApplication().exit();
      }
  );
}

module.exports.onStart = function() {
  localPort = tizen.messageport.requestLocalMessagePort(portName);
  portID = localPort.addMessagePortListener(onReceived);
}

module.exports.onRequest = function () {};

module.exports.onExit = function() {
  try {
    localPort.removeMessagePortListener(portID);
  } catch (e) {}
}
