export interface FromSchoolDto {
  id?: number;
  name: string;
  socialNetworks: [{ name: string; url: string }];
  openingHours: [];
}
