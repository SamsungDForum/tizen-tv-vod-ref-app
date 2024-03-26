import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onVideoQualityListLoaded(event: Event) {
  const qualityList = event.levels;
  const codecs: any = [];
  qualityList.forEach(item => {
    if(!codecs.includes(item.videoCodec)) {
      codecs.push(item.videoCodec);
    }
  });
    
  const list: any = [];
  codecs.forEach(codec => {
    list.push({ category: codec, options: []});
  });
  codecs.forEach((codec, index) => {
    qualityList.forEach(item => {
      if(item.videoCodec === codec) {
        list[index].options.push(`${item.width} x ${item.height}`);
      }
    })
  });

  videoQualityDispatch({ current: 'auto', list });
}

export default onVideoQualityListLoaded;