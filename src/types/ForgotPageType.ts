export type LoginType = {
  type: string;
  pass?: string | null;
};

export type ForgotType = {
  type: string;
  otp: string;
};
