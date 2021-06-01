import SendGridAttachment from './SendGrid/SendGridAttachment';

export default class TemplatedEmailDto {
  applicationId: string;
  tenantId: string | undefined;
  toEmail: string;
  toName: string | undefined;
  fromEmail: string | undefined;
  fromName: string | undefined;
  templateName: string;
  subjectReplacements: string;
  bodyReplacements: string;
  nonTemplateSubject: string | undefined;
  nonTemplateText: string | undefined;
  attachments: Array<SendGridAttachment>;

  constructor() {
    this.applicationId = '';
    this.tenantId = '';
    this.toEmail = '';
    this.toName = '';
    this.fromEmail = '';
    this.fromName = '';
    this.templateName = '';
    this.subjectReplacements = '';
    this.bodyReplacements = '';
    this.nonTemplateSubject = '';
    this.nonTemplateText = '';
    this.attachments = [];
  }
}
