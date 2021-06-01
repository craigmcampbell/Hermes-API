import SendGridEmailName from './SendGridEmailName';
import SendGridAttachment from './SendGridAttachment';

export default class SendGridEmail {
  to: SendGridEmailName;
  from: SendGridEmailName;
  subject: string;
  text: string;
  html: string;
  attachments: Array<SendGridAttachment> | undefined;

  constructor(
    to: SendGridEmailName,
    from: SendGridEmailName,
    subject: string,
    text: string,
    html: string,
    attachments: Array<SendGridAttachment> | undefined = undefined
  ) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.attachments = attachments;
  }
}
