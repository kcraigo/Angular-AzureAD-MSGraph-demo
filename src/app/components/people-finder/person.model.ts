export class Person {
  constructor(
    public id: string,
    public displayName: string,
    public givenName: string,
    public surname: string,
    public employeeId: string,
    public department: string,
    public employeeType: string,
    public officeLocation: string,
    public jobTitle: string,
    public companyName: string,
    public businessPhones: string[],
    public mobilePhone: string,
    public userPrincipalName: string
  ) {}
}
