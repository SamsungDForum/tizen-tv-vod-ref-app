<dl>

# 3<sup>rd</sup> party player version

<dd>

Application is bundled with predefined player version. Definition and corresponding url are located
in player associated subdirectories of ```/configs/player/```

Example:

```javascript
// CDN version links
// https://bitmovin.com/docs/player/releases/web
const version = [
  {
    type: type,
    version: "v8 latest",
    args: { src: "https://cdn.bitmovin.com/player/web/8/bitmovinplayer.js" },
  },
  {
    type: type,
    version: "8.93.0",
    args: {
      src: "https://cdn.bitmovin.com/player/web/8.93.0/bitmovinplayer.js",
    },
  },
];
```

## :warning: WARNING :warning:
Use with care. If player version APIs are not compatible, application behaviour will be less then determined.



</dd>

</dl>