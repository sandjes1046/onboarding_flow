export interface UserData {
  about_me?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string; // The `zip` property is now optional
  birthday?: string;
}

export interface StepProps {
  email: string;
  step: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  backButton?: () => React.ReactNode
}

export interface LocationState {
  email: string;
  password: string;
}