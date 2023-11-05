interface User {
  email: string;
  password: string;
}

interface HolidayErrors {
  holidayType: string;
  startingDate: string;
  endingDate: string;
  description: string;
}

interface DataGridRow {
  getId: () => string;
  getTextFor: (key: string) => string | string[];
}

interface DataGridColumnHeader {
  key: string;
  label: string;
}

interface UserInformation {
  id?: string,
  token?: string
}

interface OptionItem {
  label :string,
  key: string,
  valueOption: unknown
}
export type { User, HolidayErrors, DataGridRow, DataGridColumnHeader, UserInformation, OptionItem };
