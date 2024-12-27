<dl>

# npm scripts

  <dd>
    <table>
      <tr>
        <th>Script</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>npm run config:devices</code></td>
        <td>
          Starts wizard for interactive creation of <code>device-configuration.json</code> file.
        </td>
      </tr>
      <tr>
        <td><code>npm run serve:dev <i>[-- options]</i></code></td>
        <td>
          Starts local http server. Application will be served in <a href=https://webpack.js.org/configuration/mode/ >development mode.</a>
          <hr>
          Options:
          <dd>
            <br>
            <code><i>host=ip address</i></code>
            <br>
            Specifies IP address of network interface which will be bound to running server. Override's webpack's <code>devServer.host</code> setting. 
            <br><br>
            <code><i>port=port number</i></code>
            <br>
            Allows to specify port to be used. Override's webpack's <code>devServer.port</code> setting
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run serve:dev -- host=192.168.137.1</code>
            <br>
            Bind server to interface with IP <code>192.168.137.1</code>
            <br><br>
            <code>npm run serve:dev -- host=192.168.137.1 port=6666</code>
            Bind server to interface with IP <code>192.168.137.1</code> using port number <code>6666</code>
          </dd>
        </td>
      </tr>
      <tr>
        <td><code>npm run serve:prod <i>[-- options]</i></code></td>
        <td>
          Starts local http server. Application will be served in <a href=https://webpack.js.org/configuration/mode/ >production mode. </a>
          <br><br>
          <code>npm run serve:dev</code> options apply to <code>npm run serve:prod</code>
        </td>
      </tr>
      <tr>
        <td><code>npm run serve:https</code></td>
        <td>
          Starts local https server. Application will be served in <a href=https://webpack.js.org/configuration/mode/ >developer mode</a>. To fully work extra repository needs to be placed next to this one in folder tree - so that project will find ssl certificates for https. Extra connected repository is: https://github.sec.samsung.net/Multichannel-Video-Services/ssl-cert</a>
        </td>
      </tr>
      <tr>
        <td><code>npm run bundle:clean</code></td>
        <td>
          Clears bundle and package output directories.<br>
          <code>dist</code> - bundle directory<br>
          <code>out</code> - package directory<br>
        </td>
      </tr>
      <tr>
        <td><code>npm run bundle:dev</code></td>
        <td>
          Bundles application in <a href=https://webpack.js.org/configuration/mode/ >development mode.</a> Generated bundle will be placed
          in <code>dist</code> directory.
        </td>
      </tr>
      <tr>
        <td><code>npm run bundle</code></td>
        <td>
          Bundles application in <a href=https://webpack.js.org/configuration/mode/ >production mode.</a> Generated bundle will be placed
          in <code>dist</code> directory.
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:pack <i>[-- options]</i></code>
        </td>
        <td>
          Creates device package from bundle, placing result in <code>out</code>
          directory. When run without any options, Certificate Manager active profile will be used when signing package.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Certificate profile, if defined in file, will be used for signing device package.
            <br><br>
            <code><i>profile=name</i></code>
            <br>
            Name of certification profile to use for signing device package.
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run target:pack</code>
            <br>
            Create device package using Certificate Manager active profile.
            <br><br>
            <code>npm run target:pack -- profile=<i>MyProfile</i></code>
            <br>
            Created device package will be signed using profile named <i>MyProfile</i>. Profile with such name must be defined in Certificate Manager but does not have to be active.
            <br><br>
            <code>npm run target:pack -- device=<i>MyDevice</i></code>
            <br>
            Certificate profile associated with <i>MyDevice</i> in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> will be used to sign device package. If <i>MyDevice</i> does not specify certification profile, Certificate Manager active profile will be used.
          </dd>
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:install <i>[-- options]</i></code>
        </td>
        <td>
          Installs device package on target device. Device package should be created with <code>npm run target:pack</code> prior to installation.
          <br>
          When invoked without any options, Device Manager active connection defines target device where application will be installed.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be installed on devices specified by <code>target</code> property associated with named device.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device where to install application.
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run target:install</code>
            <br>
            Application will be installed on first active device in Device Manager.
            <br><br>
            <code>npm run target:install -- device=<i>MyDevice</i></code>
            <br>
            Target device associated with <i>MyDevice</i> defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> will be used for installation.
            <br><br>
            <code>npm run target:install -- target=<i>IP</i></code>
            <br>
            <code>npm run target:install -- target=<i>IP:Port</i></code>
            <br>
            Install application on target device specified by <i>IP</i> or <i>IP:Port</i>. Port defaults to 26101 when omitted.
          </dd>
      </tr>
      <tr>
        <td>
          <code>npm run target:launch <i>[-- options]</i></code>
        </td>
        <td>
          Launches installed application on target device.
          <br>
          Prior to launch, application should be installed on target device. <br>
          When invoked without any options, Device Manager active connection defines target device where application will be installed.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be launched on devices specified by targetIp.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device where to launch application.
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run target:launch</code>
            <br>
            Starts application on first active device in Device Manager.
            <br><br>
            <code>npm run target:launch -- device=<i>MyDevice</i></code>
            <br>
            Start application on target device associated with <i>MyDevice</i> defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a>
            <br><br>
            <code>npm run target:launch -- target=<i>IP</i></code>
            <br>
            <code>npm run target:launch -- target=<i>IP:Port</i></code>
            <br>
            Launch application on target device specified by <i>IP</i> or <i>IP:Port</i>. Port defaults to 26101 when omitted.
          </dd>
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:kill <i>[-- options]</i></code>
        </td>
        <td>
          Terminates application running on target device. When invoked without any options, Device Manager active connection defines target device on which application is to be terminated.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be terminated on devices specified by targetIp.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device on which application is to be terminated.
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run target:kill</code>
            <br>
            Terminates application on first active device in Device Manager.
            <br><br>
            <code>npm run target:kill -- device=<i>MyDevice</i></code>
            <br>
            Terminates application on target device associated with <i>MyDevice</i> defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a>
            <br><br>
            <code>npm run target:kill -- target=<i>IP</i></code>
            <br>
            <code>npm run target:kill -- target=<i>IP:Port</i></code>
            <br>
            Terminates application on target device specified by <i>IP</i> or <i>IP:Port</i>. Port defaults to 26101 when omitted.
          </dd>
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:devtools <i>[-- options]</i></code>
        </td>
        <td>
          Launches installed application on target device attaching Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> to running application. When invoked without any options, Device Manager active connection defines target device on which application is to be launched. <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend will be opened in default browser.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be launched on devices specified by targetIp to which Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be attached.
            Configuration file allows to specify chrome browser to be used as frontend client for <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> via <code>chrome</code> field. For best debugging experience, it is recommended to use Chrome version matching <a href="https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html">Web Client</a> running target device.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device on which application application is to be launched. Attached Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be opened in default browser, unless <code>chrome</code> parameter is specified.
            <br><br>
            <code><i>chrome=path to chrome executable</i></code>
            <br>
            Chrome executable to to be used as frontend to 
            Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a>
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            <code>npm run target:devtools</code>
            <br>
            Starts application in debug mode on first active device in Device Manager. Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be opened in default browser
            <br><br>
            <code>npm run target:devtools -- device=<i>MyDevice</i></code>
            <br>
            Starts application in debug mode on target device associated with <i>MyDevice</i> defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a><br>
            If <i>MyDevice</i> definition contains <code>chrome</code> field pointing to chrome executable then this executable will be used as <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend, otherwise frontend will be opened in default browser.
            <br><br>
            <code>npm run target:devtools -- target=<i>IP</i></code>
            <br>
            <code>npm run target:devtools -- target=<i>IP:Port</i></code>
            <br>
            Starts application in debug mode on target device specified by <i>IP</i> or <i>IP:Port</i>. Port defaults to 26101 when omitted.
            <br><br>
            <code>npm run target:devtools -- chrome=<i>C:\path\to\chrome.exe</i></code><br>
            Starts application in debug mode on first active device in Device Manager using chrome executable <i>C:\path\to\chrome.exe</i> as <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend.
            <br><br>
            <code>npm run target:devtools -- target=<i>IP</i> chrome=<i>C:\path\to\chrome.exe</i></code><br>
            Starts application in debug mode on target device specified by <i>IP:26101</i> with <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend client <i>C:\path\to\chrome.exe</i>
          </dd>
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:run:dev <i>[-- options]</i></code>
          <br><br>
          <code>npm run target:run <i>[-- options]</i></code>
          <br><br>
          <code>npm run target:debug:dev <i>[-- options]</i></code>
          <br><br>
          <code>npm run target:debug <i>[-- options]</i></code>
        </td>
        <td>
          <code>npm run target:run</i></code> / <code>npm run target:debug</i></code> are an all-in-one scripts which bundle application, create target package, install it and run newly installed application on target device, optionally attaching Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> to running application. When invoked without any options, target bundle will be signed with Certificate Manager active profile and installed on device being currently active in Device Manager. When used in debug mode, <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> frontend will be opened in default browser.
          <code>dev</code> postfix specifies <a href=https://webpack.js.org/configuration/mode/ >development mode.</a> bundling. If not present, production mode will be used.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be launched on devices specified by targetIp to which Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be attached.
            Configuration file allows to specify chrome browser to be used as frontend client for <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> via <code>chrome</code> field. For best debugging experience, it is recommended to use Chrome version matching <a href="https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html">Web Engine</a> running target device.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device on which application application is to be launched. Attached Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be opened in default browser, unless <code>chrome</code> parameter is specified.
            <br><br>
            <code><i>chrome=path to chrome executable</i></code>
            <br>
            Chrome executable to to be used as frontend to 
            Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a>.
          </dd>
          <hr>
          Examples:
          <dd>
            <br>
            See <code>npm run target:devtools</code> / <code>npm run target:launch</code> for options usage.
          </dd>
        </td>
      </tr>
      <tr>
        <td>
          <code>npm run target:serve:run <i>[-- options]</i></code>
          <br><br>
          <code>npm run target:serve:debug <i>[-- options]</i></code>
          <br><br>
          See <a href=/docs/issues.md><b>Known issues</b></a>
        </td>
        <td>
          <code>npm run target:serve:*</i></code>  are an all-in-one scripts, similar to their 'run' equivalents, however, instead of launching an application on target device, a loader application is installed and launched on target device.
          <br>
          Loader is a <a href="https://developer.samsung.com/smarttv/develop/faq/hosted-applications.html"> hosted application </a>. In contrast to standard applications, hosted apps are downloaded from external server specified in application's config.xml file via <code>content src</code> field.
          <br>
          By default, Webpack's <a href="https://webpack.js.org/configuration/dev-server/">Dev Server</a> is used for this purpose. hot/live reload behavior settings are defined in <code>scripts/webpack.common.js</code> file.
          <br>
          When invoked without any options, loader application will be signed using Certificate Manager active profile and installed on a device active in Device Manager. Server url will be infered from <code>scripts/webpack.common.js</code>. If Webpack <a href="https://webpack.js.org/configuration/dev-server/">Dev Server</a> is set to run on all interfaces, <code>devServer.host="0.0.0.0"</code>, IPv4 of first network interface will be used as application source along with <code>devServer.port</code> and <code>devServer.server.type</code> settings.
          <br>
          <code>run</code> / <code>debug</code> postfix defines runtime model. In case of <code>run</code>, loader application will be launched on target device. If <code>debug</code> postfix is specified,
          Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be attached to launched application. Frontend will be opened in default browser.
          <hr>
          Options:
          <dd>
            <br>
            <code><i>device=name</i></code>
            <br>
            Name of the device as defined in <a href=/docs/device_configuration.md><code>device-configuration.json</code></a> file. Application will be launched on devices specified by targetIp.
            Configuration file allows to specify chrome browser to be used as frontend client for <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> via <code>chrome</code> field. For best debugging experience, it is recommended to use Chrome version matching <a href="https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html">Web Client</a> running target device. Applies when script is invoked with <code>debug</code> postfix.
            <br><br>
            <code><i>target=device ip:port</i></code>
            <br>
            IP:port address of device on which application application is to be launched. Attached Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a> will be opened in default browser.
            <br><br>
            <code><i>sourceUrl=server's ip:port</i></code>
            <br>
            Specifies hot/live reload server IP:port to be used by loader application. When omitted, sourceURL is inferred from server settings, 
            however, in WAN scenarios server may not be accessible directly but via indirect address. This option allows to specify sourceUrl to be used.
            <code><i>chrome=path to chrome executable</i></code>
            <br>
            Chrome executable to to be used as frontend to 
            Chrome <a href="https://developer.chrome.com/docs/devtools/">DevTools</a>.
            </dd>
        </td>
      </tr>
    </table>
  </dd>
</dl>
