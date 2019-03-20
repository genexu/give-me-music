import axios from 'axios';
import youtubeConfig from '../configs/youtubeConfig';

class youtubeService {
  constructor({part = 'snippet,contentDetails', maxResults = 50, fields = 'nextPageToken,items(snippet/title,contentDetails/videoId)'}) {
    this.part = part;
    this.maxResults = maxResults;
    this.fields = fields;
    this.key = youtubeConfig.key;
    this.tags = youtubeConfig.tags;
  }
  getPlaylistItems(playlistId, pageToken = null) {
    let baseUrl = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=${this.part}&maxResults=${this.maxResults}&fields=${this.fields}&key=${this.key}`;
    let url = baseUrl += pageToken ? `&pageToken=${pageToken}` : '';
    return axios.get(url)
      .then(res => {
        let items = res.data.items
        let nextPageToken = res.data.nextPageToken
        if (nextPageToken) {
          return this.getPlaylistItems(playlistId, nextPageToken)
            .then(nextItems => {
              return items.concat(nextItems)
            })
        }
        return items;
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
