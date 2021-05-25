export default interface AddTemplateDto {
  applicationId: number;
  name: string;
  friendlyName: string | undefined;
  fromEmail: string;
  subject: string;
  text: string;
  templateCategoryId: number | undefined;
  tenantId: number | undefined;
  description: string | undefined;
}
