import youtubeService from './youtubeService';
import { helpMessage } from '../constants/message';

class messageService {
  static handleMessage(text) {
    let splittedMessage = text.split(/\s+/);
    if (splittedMessage[0] !== 'GiveMeMusic') return null;
    
    let returnText = null; 
    let youtubeSvc = new youtubeService({});

    if (splittedMessage.length === 1) return messageService.getRandVideoUrl(youtubeSvc);

    let command = splittedMessage[1];
    switch(command) {
      case '-h':
      case '--help':
        returnText = helpMessage;
        break;
      case '-l':
      case '--list':
        returnText = messageService.getTagListText(youtubeSvc);
        break;
      default:
        returnText = messageService.getTaggedVideoUrl(youtubeSvc, command);
        break;
    }

    if (!returnText) return 'Command Not Supported';
    return returnText;
  } 
  static getTagListText(youtubeSvc) {
    const tags = youtubeSvc.tags;
    let text = '=== Tag List === \n';
    text += 'Primary Tag | Secondary Tag | Shortcut \n';
    tags.forEach(tagItem => {
      text += `${tagItem.primaryTag} | ${tagItem.secondaryTag} | ${tagItem.shortcut} \n`;
    })
    return text;
  } 
  static async getRandVideoUrl(youtubeSvc) {
    const tags = youtubeSvc.tags; 
    const randTaggedPlaylistIndex = Math.floor(Math.random() * tags.length);
    const playlistId = tags[randTaggedPlaylistIndex].playlistId;
    const playlistItems = await youtubeSvc.getPlaylistItems(playlistId);
    const videoItem = youtubeService.getRandVideoItemFromPlaylistItems(playlistItems);
    return messageService.genVideoUrlByVideoId(videoItem.contentDetails.videoId);
  }
  static async getTaggedVideoUrl(youtubeSvc, command) {
    const tags = youtubeSvc.tags; 
    let playlistId = null;

    for(let i = 0; i < tags.length; i++) {
      if (command === tags[i].primaryTag || command === tags[i].secondaryTag || command === tags[i].shortcut) {
        playlistId = tags[i].playlistId;
        break;
      }
    }

    if (!playlistId) return null;

    const playlistItems = await youtubeSvc.getPlaylistItems(playlistId);
    const videoItem = youtubeService.getRandVideoItemFromPlaylistItems(playlistItems);
    return messageService.genVideoUrlByVideoId(videoItem.contentDetails.videoId);
  }
  static genVideoUrlByVideoId(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}

export default messageService;
