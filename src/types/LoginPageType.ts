export type LoginType = {
  type: string;
  pass?: string | null;
};

export type SignInType = {
  type: string;
  pass?: string;
  otp: string;
  user: string;
};

export type LoginProps = {
  sendOtp: (data: LoginType) => void;
  isLoading: boolean;
  oauth: () => void;
};

export type LoginFormType = {
  type: string;
  pass: string;
};
