# device-configuration.json
Device configuration file provides means to define multiple target devices. Target devices can be passed to npm scripts via their name forgoing need for manual target device switching via Device and Certificate Managers.

`device-configuration.json` should be placed in application root folder.
Optional fields can be omitted from file.

```js
[
  {
    "name": String,
    "target": String,
    "port": Number,
    "profile": String,
    "chrome": String
  }
]
```

## Field description

<table>
  <tr>
    <td><code>name</code></td>
    <td><i>required</i></td>
    <td>
      User friendly device name. Passed to npm scripts as device name identifier. Must be unique.
    </td>
  </tr>
  <tr>
    <td><code>target</code></td>
    <td><i>required</i></td>
    <td>
      IP address of target device. Specified as IP or IP:Port.
      <br><br>
      Defaults to port 26101 when not specified.
    </td>
  </tr>
  <tr>
    <td><code>port</code></td>
    <td><i>optional</i></td>
    <td>
      Local debug port to be used for communication between Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> and an application being debugged on target device. 
      <br><br>
      Defaults to port 9666 when not specified.
      <br><br>
      Setting up different ports for devices, allows running concurrent <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> instances on multiple devices.
    </td>
  </tr>
  <tr>
    <td><code>profile</code></td>
    <td><i>optional</i></td>
    <td>
      Certificate profile name to be used when signing device package for this device. Certificate profile needs to be defined in Certificate Manager.
      <br><br>
      If not specified, active certificate profile will be used.
    </td>
  </tr>
  <tr>
    <td><code>chrome</code></td>
    <td><i>optional</i></td>
    <td>
      Path to Chrome executable to be used as <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> client.
      <br><br>
      If not specified, <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend will be opened in default browser.
      <br><br>
      TV Devices run different versions of <a href="https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html">Web Engine</a>, model year dependant. When utilizing chrome executable as <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> client, using version matching target device may yield best experience.
    </td>
  </tr>
</table>
