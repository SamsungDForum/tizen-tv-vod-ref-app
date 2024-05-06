import { type Media } from '../Components/usePlayerFactory/utils/playAssetCurrentTypes';
import VideoContent from './VideoContent.json';

const map = new Map<number, Media>();
const indexMap = new Map<number, number>();
VideoContent.forEach(item => {
  map.set(item.id, item);
});
VideoContent.forEach((item, index) => {
  indexMap.set(item.id, index);
});

function get(id: number): Media | undefined {
  return map.get(id);
}

function findIndex(id: number): number | undefined {
  return indexMap.get(id);
}

export { get, findIndex };