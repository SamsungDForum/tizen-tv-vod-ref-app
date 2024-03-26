<dl>

# Favorite clips content
<dd>

In app media content is stored in ```/src/data/VideoContent.json``` and bundled with application. 
In order to add custom media content without bundling web application, ```VideoContent.json``` file custom content should be place in root folder of USB memory stick and inserted into TV device. Web application will read in information stored there.

When running in browser, custom content can be uploaded by navigating to ```Favorite Clips``` option. 

### Saving Clips as Favourites
To add/remove a clip to your favourites, press the red button on your remote control ("F" on a PC keyboard) or hold ENTER while focusing video clip thumbnail.
There's also QuickEdit option when enabled, this option allows you to effortlessly add or remove clips with a single click, eliminating the need to hold down the enter key.
By default, when you find a video clip you want to save as a favorite, the app will save it into local storage. 
  


### Exporting and Importing Clips
You can also manage your favorite clips by exporting them to a USB device and importing clips from a USB device. <br/> Please note that importing clips will overwrite your current favourites.

#### Exporting Clips:
Navigate to the "Favorite Clips" tab in the app menu.
<br/>
TV: Select the "Export clips to USB" option and confirm export.
<br/>
PC: Select the "Export clips to file" option, and it will be automatically saved to your default download location.
  
#### Importing Clips:
Navigate to the "Favorite Clips" tab in the app menu. 
<br/>
TV: Select the "Import from USB" option and confirm import.
<br/>
PC: Drag&Drop file with your favorite clips into dotted area.

  
</dd>
<br>

## VideoContent.json file structure
<dd>

```VideoContent.json``` file needs to be an array of video objects.
```js
[
    {}, {}, {}, // and so on...
]
```

Video object contains following fields:

```js
{
    id: Number,
    name: String,
    requiresAuth: Boolean,
    url: String,
    poster: String,
    widthResolution: Number[],
    heightResolution: Number[],
    licenseServerURL: String
    drmType: String,
    drmPreference: String[],
    contentType: String,
    subtitles: String[],
    audio: String[],
    manifest: String,
    container: String[]
}

// An example

{
    "id": 7,
    "name": "[Widevine] Sintel",
    "requiresAuth": true,
    "url": "https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd",
    "poster": "https://storage.googleapis.com/shaka-asset-icons/sintel.png",
    "licenseServerURL": "https://cwip-shaka-proxy.appspot.com/no_auth",
    "drmType": "com.widevine.alpha",
    "widthResolution": [3840, 2560, 1920, 1280, 1024, 854, 640, 426, 256],
    "heightResolution": [1636, 1090, 818, 546, 436, 364, 272, 182, 110],
    "subtitles": ["nl", "en", "fr", "de", "it", "pl", "pt", "ru", "es", "vi"],
    "audio": ["en"],
    "manifest": "DASH",
    "container": ["MP4", "WEBM"]
}
```
</dd>
<br>

### Field description

<dd>

| Field | Mandatory | Description |
|-------|-----------|-------------|
| id | Yes | Clip id number. Must be unique. |
| name | Yes | Human friendly clip name. |
| requiresAuth | No | Flag indicating if clip is DRM protected. |
| url | Yes | Media content url. |
| poster | No | Media content poster url. |
| widthResolution | Yes | Used for grouping purpose. Values can be ommited, but an empty array must be specified|
| heightResolution | No | Used for grouping purpose. |
| licenseServerUrl | No | DRM License server url. Needs to be provided if manifest or media do not contain license server information. |
| drmType | No | DRM key system name. |
| drmPreference | No | Array of DRM key system names. Order of key system names reflecting DRM preference when selecting DRM key system to be used. |
| contentType | No | MIME type of media content. |
| subtitles | No | Array of subtitle languages. Used for filtration purposes. |
| audio | No | Array of audio tracks. Used for filtration purposes. |
| manifest | No | Manifest type. One of "DASH", "HLS", "MSS". Used for filtration purposes. | 
| container | No | Container type. Used for filtration purposes. |
| excludedFrom | No | 3<sup>rd</sup> party player exclusion. |

</dd>

</dl>