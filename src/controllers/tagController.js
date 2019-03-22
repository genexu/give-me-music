import tagService from '../services/tagService';
import youtubeService from '../services/youtubeService';
import youtubeConfig from '../configs/youtubeConfig';

class tagController {
  static getTagList(req, res) {
    res.json(youtubeConfig.tags);
  }
  static async getTagPlayList(req, res) {
    const youtubeSvc = new youtubeService({});
    const playlistId = tagService.getPlaylistIdByCommand(req.params.target);
    if (!playlistId) return res.send('tag not found')
    const playlist = await youtubeSvc.getPlaylistItems(playlistId);
    return res.json(playlist);
  }
}

export default tagController;
