export default interface AddTemplateDto {
  name: string;
  friendlyName: string | undefined;
  fromEmail: string;
  subject: string;
  text: string;
  textPlain: string;
  templateCategoryId: number | undefined;
  tenantId: string | undefined;
  description: string | undefined;
}
