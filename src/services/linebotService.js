class linebotService {
  constructor({ client, messageSvc }) {
    this.client = client;
    this.messageSvc = messageSvc;
  }
  async handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null);
    const text = await this.messageSvc.handleMessage(event.message.text) 
    return this.returnText(event, text);
  }
  returnText(event, text) {
    return this.client.replyMessage(event.replyToken, {
      type: 'text',
      text: text
    });
  }
}

export default linebotService;
