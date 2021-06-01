import Debug from 'debug';
import sendGrid from '@sendgrid/mail';
import { getTemplateByName } from '../db/query/templateQuery';
import { smashTemplate } from './templateService';
import SendGridEmail from '../models/SendGrid/SendGridEmail';
import TemplatedEmailDto from '../models/TemplatedEmailDto';
import SendGridEmailName from '../models/SendGrid/SendGridEmailName';
import SendGridAttachment from '../models/SendGrid/SendGridAttachment';

const debug = Debug('app:sendEmailService');

const sendTemplatedEmail = async (dto: TemplatedEmailDto): Promise<boolean> => {
  const template = await getTemplateByName(1, dto.templateName); // Fix the application id issue

  if (template === null || template === undefined) throw 'Template not found';

  // Get email from template, override if passed in via DTO
  let fromEmail = template.fromemail;

  if (dto.fromEmail !== undefined && dto.fromEmail.length > 0) {
    fromEmail = dto.fromEmail;
  }

  // Perform replacements on subject if any
  let subject = template.subject;

  if (
    dto.subjectReplacements.length !== undefined &&
    dto.subjectReplacements.length > 0
  ) {
    subject = smashTemplate(subject, dto.subjectReplacements);
  }

  // Perform replacements on text and html content
  const textReplacedTemplate =
    template.textPlain !== null
      ? smashTemplate(template.textPlain, dto.bodyReplacements)
      : smashTemplate(template.text, dto.bodyReplacements);

  const htmlReplacedTemplate = smashTemplate(
    template.text,
    dto.bodyReplacements
  );

  const to = new SendGridEmailName(dto.toEmail, dto.fromName);
  const from = new SendGridEmailName(fromEmail, dto.fromName);

  // Look for any attachments
  if (dto.attachments) {
    for (let i = 0; i < dto.attachments.length; i++) {
      const fileCount = i + 1;
      dto.attachments[i] = createAttachment(fileCount, dto.attachments[i]);
    }
  }

  const email = new SendGridEmail(
    to,
    from,
    subject,
    textReplacedTemplate,
    htmlReplacedTemplate,
    dto.attachments
  );

  const isValid: [boolean, string] = emailIsValid(email);
  if (!isValid[0]) throw isValid[1];

  return await sendEmail(email);
};

const createAttachment = (index: number, attachment: SendGridAttachment) => {
  attachment.disposition = 'attachment';
  attachment.content_id = `attachment_${attachment}`;

  return attachment;
};

const sendNonTemplatedEmail = async (
  dto: TemplatedEmailDto
): Promise<boolean> => {
  const to = new SendGridEmailName(dto.toEmail, dto.fromName);
  const from = new SendGridEmailName(dto.fromEmail ?? '', dto.fromName);

  const email = new SendGridEmail(
    to,
    from,
    dto.nonTemplateSubject ?? '',
    dto.nonTemplateText ?? '',
    dto.nonTemplateText ?? ''
  );

  const isValid: [boolean, string] = emailIsValid(email);
  if (!isValid[0]) throw isValid[1];

  if (email.text == undefined || email.text.length == 0) {
    email.text = email.html;
  }

  return await sendEmail(email);
};

const sendEmail = async (email: SendGridEmail) => {
  if (process.env.SEND_EMAILS === 'true') {
    const apiToken = process.env.SENDGRID_API_TOKEN ?? '';

    sendGrid.setApiKey(apiToken);

    if (email.text == undefined || email.text.length == 0) {
      email.text = email.html;
    }

    await sendGrid.send(email);

    return true;
  }

  return false;
};

const emailIsValid = (email: SendGridEmail): [boolean, string] => {
  if (email.to.email.length === 0) return [false, 'To email is required'];
  if (email.from.email.length === 0) return [false, 'From email is required'];
  if (email.subject.length === 0) return [false, 'Subject is required'];
  if (email.text.length === 0) return [false, 'Plain text is required'];
  if (email.html.length === 0) return [false, 'Html text is required'];

  return [true, ''];
};

export { sendTemplatedEmail, sendNonTemplatedEmail };
