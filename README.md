# Give Me Music

## Starting LineBot server

```bash
~$ docker run --name give_me_music_linebot \
-e LINE_CHANNEL_ACCESS_TOKEN='line_channel_access_token' \
-e LINE_CHANNEL_SECRET='line_channel_secret' \
-e YOUTUBE_API_KEY='youtube_api_key' \
-p 80:8080 \
give-me-music:latest
```
