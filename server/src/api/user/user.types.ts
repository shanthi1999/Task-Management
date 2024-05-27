export interface User {
  firstName: String;
  lastName?: String;
  phoneNumber: String;
  DOB: String;
  email: String;
  roles?: String[];
  location?: String;
  permissions?: String[];
}
