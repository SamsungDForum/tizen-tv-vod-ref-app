import { audio as audioDispatch } from "../../../utils/setting";

function onAudioListLoaded(player: bitmovin.BitmovinInstance) {
  const audioList = player.getAvailableAudio();
  const mimeTypes: string[] = [];
  const result: {
    category: string;
    options: string[];
  }[] = [];

  audioList.forEach(item => {
    let cleanID: string = removeNumberPart(item.id);
    if(!mimeTypes.includes(cleanID)) {
      mimeTypes.push(cleanID);
    }
  })

  mimeTypes.forEach(mimeType => {
    result.push({ category: mimeType, options: []});
  });

  mimeTypes.forEach((mimeType, counter) => {
    audioList.forEach(item => {
      if(item.id.includes(mimeType)) {
        result[counter].options.push(item.lang);
      }
    })
  })

  audioDispatch({ current: 'default', list: result });
    
  function removeNumberPart(string) {
    return string.replace(/-[0-9]+/, '').replace('audio/', '');
  }
}

export default onAudioListLoaded;