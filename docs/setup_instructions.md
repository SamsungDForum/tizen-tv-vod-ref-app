## Setup instruction

<dd>

### Prerequisites:

- [node.js](https://nodejs.org/en/) - Any recent version should suffice.
- Setup web application dependencies using npm package manager:
  ```
  npm install
  ```
  </dd>

  <dd> 

  ### Tizen TV device specific
  Following steps are only required for running web application on Tizen TV device.

  - Install [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download). If IDE will not be used, command line (CLI) version will suffice.
  - Install ```Certificate Manager```, ```Samsung Certificate Extension``` and ```Web SDK tools``` packages using command line tool  
    ```PowerShell
    tizen-studio\package-manager> .\package-manager-cli.exe show-pkgs
    Display installed packages' information
    Package Manager (0.5.39)

    Status  Package Name                                    Package Version Component Name
    ------------------------------------------------------------------------------------------------------------------------
    i       Certificate-Manager                             2.8.7           Certificate Manager
    i       cert-add-on                                     2.0.62          Samsung Certificate Extension
    i       WebCLI                                          2.8.7           Web CLI
    ```
    or using GUI Package Manager.
  - Configure [Tizen TV device](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-device.html).
  - Created [certificate profile](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/creating-certificates.html) with Samsung Certificate.
  Samsung certificate is set with Tizen TV device DUID. Changing Tizen TV device will require new certificate.

#### Configuring target tv device(s)
[Device configuration](/docs/device_configuration.md) allows to associate target device parameters with friendly name which
can be used with [npm scripts](/docs/npm_scripts.md) forgoing need relying on active device connection / certification
profile.

<br>

[Device configuration](/docs/device_configuration.md) can be performed manually by editing `device-configuration.json` file or by running
configuration script which will prompt for target device information:

```
npm run config:devices

> pvod-mvs-reference-app@2.2.1 config:devices
> node scripts/config-devices.js

[ 'config-devices' ]
? Add target devices to device-configuration.json ? yes
? Target name pontek
? Target IP/IP:Port 106.116.154.162
? Local debug port 9666
? Certificate profile 106_116_154_162
? Chrome executable path
? Configure another device ? no
[ 'config-devices' ]  C:\repo\tizenweb-livetvapp-reference\device-configuration.json  written
```

Configured device can then be referenced in [npm scripts](/docs/npm_scripts.md). For example:

```
npm run target:run:dev -- device=pontek
```


</dd>

<dd>

#### Debugging on target device
Application running on target device can be debugged in two ways, standalone or hot reload mode. <br><br>
Standalone: 
```
  npm run target:debug:dev
```
Script will bundle, pack, install and launch an application in debug mode opening <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend in default browser.


Hot reload: <br>
In hot reload mode, instead of player application a loader application is installed which downloads player application from local development web server.
```
  npm run serve:dev
```
Script starts development web server
```
  target:serve:debug:dev
```
Script bundles, packs, installs and launches loader application in debug mode opening <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend in default browser.
 
</dd>

<dd>

#### Using dedicated DevTools frontend
Default behaviour of debug scripts is to open <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend in default browser. This behavior can be changed by specifying `chrome` as argument 
```
  target:debug:dev -- chrome=Path_To_Chrome_Executable
```
or in `device-configuration.json` file. For best experience, chrome client should closely match version of web engine running on a device. <br>
[Browser download](/docs/browser_download.md) page contains links to chrome client matching Tizen TV versions.
</dd>

<dd>