export default class SendGridAttachment {
  content: string;
  filename: string;
  type: string;
  disposition: string;
  content_id: string;

  constructor() {
    this.content = '';
    this.filename = '';
    this.type = '';
    this.disposition = '';
    this.content_id = '';
  }
}
