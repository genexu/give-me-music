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
        retrunText = messageServeic.getTaggedVideoUrl(youtubeSvc, command);
        break;
    }

    if (!returnText) return 'Command Not Supported';
    return returnText;
  } 
  static getTagListText(youtubeSvc) {
    const tags = youtubeSvc.tags;
    return 'Tags List';
  } 
  static getRandVideoUrl(youtubeSvc) {
    const tags = youtubeSvc.tags; 
    const randTaggedPlaylistIndex = Math.floor(Math.random() * tags.length);
    const playlistId = tags[randTaggedPlaylistIndex];
    const playlistItems = youtubeSvc.getPlaylistItems(playlistId); 
    const videoItem = youtubeService.getRandVideoItemFromPlaylistItems(playlistItems);
    return massageService.genVideoUrlByVideoId(videoItem.contentDetails.videoId);
  }
  static getTagedVideoUrl(youtubeSvc, command) {
    const tags = youtubeSvc.tags; 
    let playlistId = null;

    for(let i = 0; i < tags.length; i++) {
      if (command === tags.primaryTag || command === tags.secondaryTag || command === tags.shortcut) {
        playlistId = tags.playlistId;
        break;
      }
    }

    if (!playlistId) return null;

    const playlistItems = youtubeSvc.getPlaylistItems(playlistId); 
    const videoItem = youtubeService.getRandVideoItemFromPlaylistItems(playlistItems);
    return massageService.genVideoUrlByVideoId(videoItem.contentDetails.videoId);
  }
  static genVideoUrlByVideoId(videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}

export default messageService;
