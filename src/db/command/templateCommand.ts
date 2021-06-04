import Debug from 'debug';
import { PrismaClient } from '@prisma/client';
import AddTemplateDto from '../../interfaces/AddTemplateDto';
import EditTemplateDto from '../../interfaces/EditTemplateDto';

const debug = Debug('app:templateCommand');
const prisma = new PrismaClient();

const addTemplate = async (applicationId: number, template: AddTemplateDto) => {
  return await prisma.templates.create({
    data: {
      application_id: applicationId,
      name: template.name,
      friendlyname: template.friendlyName,
      fromemail: template.fromEmail,
      subject: template.subject,
      text: template.text,
      textPlain: template.textPlain,
      template_category_id: template.templateCategoryId,
      tenant_id: template.tenantId,
      description: template.description,
    },
  });
};

const updateTemplate = async (template: EditTemplateDto) => {
  return await prisma.templates.update({
    where: {
      id: template.id,
    },
    data: {
      application_id: template.applicationId,
      name: template.name,
      friendlyname: template.friendlyName,
      fromemail: template.fromEmail,
      subject: template.subject,
      text: template.text,
      textPlain: template.textPlain,
      template_category_id: template.templateCategoryId,
      tenant_id: template.tenantId,
      description: template.description,
    },
  });
};

export { addTemplate, updateTemplate };
