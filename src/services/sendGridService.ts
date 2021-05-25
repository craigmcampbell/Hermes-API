import Debug from 'debug';
import sendGrid from '@sendgrid/mail';
import { getTemplateByName } from '../db/query/templateQuery';
import { smashTemplate } from './templateService';
import Email from '../models/Email';
import TemplatedEmailDto from '../models/TemplatedEmailDto';

const debug = Debug('app:sendEmailService');

//TODO: Support for attachments

//TODO: Support for sender name

//TODO: Add support for text template

//TODO: Fix application and tenant id issues

const sendTemplatedEmail = async (dto: TemplatedEmailDto) => {
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

  //TODO: Update this when text field is in place
  const textReplacedTemplate = smashTemplate(
    template.text,
    dto.bodyReplacements
  );

  const htmlReplacedTemplate = smashTemplate(
    template.text,
    dto.bodyReplacements
  );

  const email = new Email(
    dto.toEmail,
    fromEmail,
    subject,
    textReplacedTemplate,
    htmlReplacedTemplate
  );

  const isValid: [boolean, string] = emailIsValid(email);
  if (!isValid[0]) throw isValid[1];

  await sendEmail(email);
};

const sendNonTemplatedEmail = async (email: Email) => {
  const isValid: [boolean, string] = emailIsValid(email);
  if (!isValid[0]) throw isValid[1];

  if (email.text == undefined || email.text.length == 0) {
    email.text = email.html;
  }

  await sendEmail(email);
};

const sendEmail = async (email: Email) => {
  const apiToken = process.env.SENDGRID_API_TOKEN ?? '';

  sendGrid.setApiKey(apiToken);

  if (email.text == undefined || email.text.length == 0) {
    email.text = email.html;
  }

  await sendGrid.send(email);
};

const emailIsValid = (email: Email): [boolean, string] => {
  //TODO: Data validations
  return [true, ''];
};

export { sendTemplatedEmail, sendNonTemplatedEmail };
