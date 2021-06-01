import Debug from 'debug';
import { addEmail, markEmailSent } from '../db/command/emailCommand';
import { sendNonTemplatedEmail } from './sendGridService';
import TemplateEmailDto from '../models/TemplatedEmailDto';

const debug = Debug('sendNonTemplatedEmailService');

const sendEmailNoTemplate = async (
  applicationId: number,
  dto: TemplateEmailDto
) => {
  const template = undefined;

  // Save the email to the database
  const savedEmail = await addEmail(applicationId, dto, template, false);

  // Generate the email and send
  const emailSent = await sendNonTemplatedEmail(dto);

  // Update email record as sent
  if (emailSent) {
    await markEmailSent(savedEmail.id);
  }

  return savedEmail;
};

export { sendEmailNoTemplate };
