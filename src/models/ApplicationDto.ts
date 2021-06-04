import EditApplicationDto from '../interfaces/EditApplicationDto';

export default class ApplicationDto implements EditApplicationDto {
  id: number;
  name: string;
  token: string;
  isActive: boolean;

  constructor(id: number, name: string, token: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.isActive = isActive;
  }
}
