import axios from 'axios';
import youtubeConfig from '../configs/youtubeConfig';

class youtubeService {
  constructor({ 
    apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems',
    part = 'snippet,contentDetails',
    maxResults = 50,
    fields = 'nextPageToken,items(snippet/title,contentDetails/videoId)'
  }) {
    this.part = part;
    this.maxResults = maxResults;
    this.fields = fields;
    this.key = youtubeConfig.key;
    this.apiUrl = apiUrl;
  }
  getPlaylistItems(playlistId, pageToken = null) {
    let baseUrl = `${this.apiUrl}?playlistId=${playlistId}&part=${this.part}&maxResults=${this.maxResults}&fields=${this.fields}&key=${this.key}`;
    let url = baseUrl += pageToken ? `&pageToken=${pageToken}` : '';
    return axios.get(url)
      .then(res => {
        let { items, nextPageToken } = res.data;
        if (!nextPageToken) return items;
        return this.getPlaylistItems(playlistId, nextPageToken).then(nextItems => items.concat(nextItems))
      })
      .catch(err => {
        console.error(err.response.data.error);
      })
  }
  static getRandVideoItemFromPlaylistItems(playlistItems) {
    const randIndex = Math.floor(Math.random() * playlistItems.length);
    return playlistItems[randIndex];
  }
}

export default youtubeService;
