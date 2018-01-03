export class PersonInfo {
  constructor (
      public id: number,
      public businessPhone: string,
      public mobilePhone: string,
      public onPremiseImmutableId: string,
      public onPremiseSamAccountName: string,
      public displayName: string,
      public employeeId: string,
      public employeeClassiification: string,
      public userPrincipalName: string,
      public department: string,
      public officeLocation: string,
      public jobTitle: string,
      public givenName: string,
      public surName: string,
      public company: string
  ) {}
}
