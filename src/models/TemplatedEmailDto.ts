export default class TemplatedEmailDto {
  applicationId: string;
  tenantId: string | undefined;
  toEmail: string;
  fromEmail: string | undefined;
  templateName: string;
  subjectReplacements: string;
  bodyReplacements: string;

  constructor() {
    this.applicationId = '';
    this.tenantId = '';
    this.toEmail = '';
    this.fromEmail = '';
    this.templateName = '';
    this.subjectReplacements = '';
    this.bodyReplacements = '';
  }
}
