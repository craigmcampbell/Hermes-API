import Debug from 'debug';
import { getTemplateByName } from '../db/query/templateQuery';
import { addEmail, markEmailSent } from '../db/command/emailCommand';
import { sendTemplatedEmail } from './sendGridService';
import TemplateEmailDto from '../models/TemplatedEmailDto';

const debug = Debug('sendTemplatedEmailService');

const sendEmailFromTemplate = async (
  applicationId: number,
  dto: TemplateEmailDto
) => {
  // Get the template from the database
  const template = await getTemplateByName(applicationId, dto.templateName);

  if (template === undefined || template === null) throw 'Template not found';

  // Save the email to the database
  const savedEmail = await addEmail(applicationId, dto, template, false);

  // Generate the email and send
  const emailSent = await sendTemplatedEmail(dto);

  // Update email record as sent
  if (emailSent) {
    await markEmailSent(savedEmail.id);
  }

  return savedEmail;
};

export { sendEmailFromTemplate };
