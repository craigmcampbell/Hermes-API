import Debug from 'debug';
import { PrismaClient, templates } from '@prisma/client';
import TemplateEmailDto from '../../models/TemplatedEmailDto';

const debug = Debug('app:emailCommand');
const prisma = new PrismaClient();

const addEmail = async (
  applicationId: number,
  dto: TemplateEmailDto,
  template: templates | undefined,
  alreadySent: boolean
) => {
  let fromAddress = '';
  if (template === undefined) {
    fromAddress = dto.fromEmail ?? '';
  } else {
    fromAddress = dto.fromEmail ?? template.fromemail;
  }

  return await prisma.emails.create({
    data: {
      application_id: applicationId,
      template_id: template?.id,
      toAddress: dto.toEmail,
      fromAddress,
      fromName: dto.fromName,
      replacements: dto.bodyReplacements,
      subjectReplacements: dto.subjectReplacements,
      nonTemplateSubject: dto.nonTemplateSubject,
      nonTemplateText: dto.nonTemplateText,
      sent: alreadySent,
      attachments: JSON.stringify(dto.attachments) ?? null,
    },
  });
};

const markEmailSent = async (id: number) => {
  return await prisma.emails.update({
    where: {
      id,
    },
    data: {
      sent: true,
    },
  });
};

export { addEmail, markEmailSent };
