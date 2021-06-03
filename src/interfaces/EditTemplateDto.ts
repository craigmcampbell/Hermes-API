import AddTemplateDto from './AddTemplateDto';

export default interface EditTemplateDto extends AddTemplateDto {
  id: number;
  applicationId: number;
}
