import Debug from 'debug';
import { PrismaClient } from '@prisma/client';
import AddTemplateDto from '../../models/AddTemplateDto';

const debug = Debug('app:templateCommand');
const prisma = new PrismaClient();

const addTemplate = async (template: AddTemplateDto) => {
  return await prisma.templates.create({
    data: {
      application_id: template.applicationId,
      name: template.name,
      friendlyname: template.friendlyName,
      fromemail: template.fromEmail,
      subject: template.subject,
      text: template.text,
      template_category_id: template.templateCategoryId,
      tenant_id: template.tenantId,
      description: template.description,
    },
  });
};

export { addTemplate };
