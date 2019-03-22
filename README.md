# Give Me Music

## Starting linebot server

```bash
~$ docker run --name give_me_music_linebot \
-e LINE_CHANNEL_ACCESS_TOKEN='Line_Channel_Access_Token' \
-e LINE_CHANNEL_SECRET='Line_Channel_Secret' \
-e YOUTUBE_API_KEY='Youtube_API_Key' \
-p 80:8080 \
genexu/give-me-music:latest
```

