import AddApplicationDto from './AddApplicationDto';

export default interface EditApplicationDto extends AddApplicationDto {
  id: number;
  token: string;
  isActive: boolean;
}
