export type Data = {
  first?: string;
  last?: string;
  user?: string;
  password?: string;
  confirm?: string;
  contact?: string;
  country?: string;
  address?: string;
  zipcode?: string;
};

export type UserData = {
  name?: string;
  login?: string;
  password?: string;
  contact?: string;
  country?: string;
  address?: string;
  zipcode?: string;
};

export type StepType1 = {
  first: string;
  last: string;
  user: string;
  password: string;
  confirm: string;
};

export type StepType2 = {
  contact: string;
  address: string;
  zipcode: string;
  country?: string;
};

export type OtpType = {
  otp: string;
};

export type StepProps = {
  submitHandler?: (data: any) => void;
  userData: UserData;
  verifyOtp?: (email: string, otp: string) => Promise<void>;
};
