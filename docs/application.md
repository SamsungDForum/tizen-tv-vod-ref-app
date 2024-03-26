# application.json

<dl>
<dd>

File contains Tizen package application information. During packaging, data from this file
are transferred to `config.xml` file and placed in `.wgt` package.

```js
{
  "pvod": {
    "name": "pvod-reference-app",
    "version": "2.3.999",
    "packageId": "4hKkWyp7UR",
    "packageName": "PvodMvsReferenceApp",
    "applicationName": "PVOD Reference App"
  },

  "bootstrap": {
    "name": "pvod-reference-app-hot-reload-bootstrap",
    "version": "1.0.0",
    "packageId": "pvodLoader",
    "packageName": "HotReloadBootstrap",
    "applicationName": "PVOD Reference App Hot Reload"
  },

  "fileDeviceConfiguration": ""
}
```

`pvod` application information for video player reference application.

`bootstrap` application information for hot/live reload bootstrap application.

`fileDeviceConfiguration` is an optional field. It allows to override default location
of `device-configuration.json` file.

## overriding default application.json file

Default `application.json` file can be overridden with a custom version which will not interfere
<br>
with one obtained from repo. To override `application.json`, place custom version of this file in
<br>
`\.local\application.json`. Build scripts will override `application.json` content with data
<br>
contained in `\.local\application.json` file.

### Example:

<dl>
<dd>

`application.json` file:

```js
{
  "pvod": {
    "name": "pvod-reference-app",
    "version": "2.3.999",
    "packageId": "4hKkWyp7UR",
    "packageName": "PvodMvsReferenceApp",
    "applicationName": "PVOD Reference App"
  },

  "bootstrap": {
    "name": "pvod-reference-app-hot-reload-bootstrap",
    "version": "1.0.0",
    "packageId": "pvodLoader",
    "packageName": "HotReloadBootstrap",
    "applicationName": "PVOD Reference App Hot Reload"
  },
}
```

`\.local\application.json` file:

```js
{
  "fileDeviceConfiguration": "path\to\device-configuration.json"
}
```

</dd>
</dl>

</dd>
</dl>
