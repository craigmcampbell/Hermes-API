export default class SendGridEmailName {
  name: string | undefined;
  email: string;

  constructor(email: string, name: string | undefined) {
    this.name = name;
    this.email = email;
  }
}
