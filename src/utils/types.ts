interface User {
  email: string;
  password: string;
}
interface SignIn {
  email: string;
  password: string;
  crudentials: string;
}

interface HolidayErrors {
  holidayType: string;
  startingDate: string;
  endingDate: string;
  description: string;
}
export { User, SignIn, HolidayErrors };
