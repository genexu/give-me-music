import youtubeConfig from '../configs/youtubeConfig';

class tagService {
  static getTagListText() {
    const tags = youtubeConfig.tags;
    let text = '=== Tag List === \n';
    text += 'Primary Tag | Secondary Tag | Shortcut \n';
    tags.forEach(tagItem => {
      text += `${tagItem.primaryTag} | ${tagItem.secondaryTag} | ${tagItem.shortcut} \n`;
    })
    return text;
  } 
  static getRandPlaylistId() {
    const tags = youtubeConfig.tags; 
    const randTaggedPlaylistIndex = Math.floor(Math.random() * tags.length);
    const playlistId = tags[randTaggedPlaylistIndex].playlistId;
    return playlistId; 
  }
  static getPlaylistIdByCommand(command) {
    const tags = youtubeConfig.tags; 
    const target = tags.find(tag => (
      command === tag.primaryTag ||
      command === tag.secondaryTag ||
      command === tag.shortcut
    ));
    if (!target) return null;
    return target.playlistId; 
  }
}

export default tagService;
