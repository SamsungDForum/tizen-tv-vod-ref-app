# Tizen TV VOD Reference Application

<dl>

## Introduction

<dd>

This project has been conceived as a demo / reference for developers / QA engineers building own [**V**ideo **O**n **D**emand](https://en.wikipedia.org/wiki/Video_on_demand) streaming application. Provided implemmentation works for Tizen TV units produced on year 2017 and newer. The major contemporary web browsers (Chrome, Edge) are also supported. Source code in this repository is open and can be included in the software products under the MIT license conditions.

```
The MIT License (MIT)  

Copyright (c) 2024 Samsung Electronics Co.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal  in the Software without restriction, including without limitation the rights  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  copies of the Software, and to permit persons to whom the Software is  furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  THE SOFTWARE.
```




> The repository contains source code compatibile with video players utilizing MSE/EME
> API. It is independent on Tizen native streaming API. The TV Web Engine assures separation for the app.

See the list of currently supported web players:

- [Shaka Player](https://github.com/shaka-project/shaka-player)
- [Bitmovin](https://bitmovin.com/)
- [dash.js](https://dashjs.org/)
- [hls.js](https://github.com/video-dev/hls.js/)

The diagram below explains system components relations and internal communication flow:

![componnets and comunication flow diagram](/assets/images/docs/system-diagram.png)

Please, before going forward be familiar with the '[Setup instructions](/docs/setup_instructions.md)' section.
<br>

<dd>

### Run with web browser

- Start development web server:
  ```
  npm run serve:dev
  ```
  There's also a short alias for this script `npm run start`.
- Open application in browser using URL:
  ```
  http://localhost:8081/
  ```
  When testing DRM content assure browser support:

  | DRM       | Edge               | Firefox            | Chrome              |
  |-----------|--------------------|--------------------|---------------------|
  | PlayReady | :heavy_check_mark: | :x:                | :x:                 |
  | Widevine  | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:  |

</dd>

<br>

<dd>

### Run with Tizen TV device

- Connect to Tizen TV Device using [sdb](https://docs.tizen.org/application/tizen-studio/common-tools/smart-development-bridge/)
  ```PowerShell
  tizen-studio\tools> .\sdb.exe connect 192.168.100.102
  * Server is not running. Start it now on port 26099 *
  * Server has started successfully *
  connecting to 192.168.100.102:26101 ...
  connected to 192.168.100.102:26101
  \tizen-studio\tools>
  ```
  or [Device Manager](https://docs.tizen.org/application/vstools/tools/device-manager/)


- Bundle, packge, install and run application on target device:
  ```
  npm run target:run:dev
  ```

</dd>

<br>

<dd>


## Further reading
- [Setup instructions](/docs/setup_instructions.md)
- [Add custom content without web application rebuild](/docs/custom_content.md)
- [The 3<sup>rd</sup> party player version](/docs/player_version.md)
- [The npm scripts](/docs/npm_scripts.md)
- [The device-configuration.json](/docs/device_configuration.md)
- [The application.json](/docs/application.md)
- [Known issues](/docs/issues.md)
</dd>
</dl>
