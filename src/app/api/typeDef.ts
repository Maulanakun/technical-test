export type responseGeneric<T> = {
  status: number;
  error?: string;
  message?: string;
  data?: T;
};

export type AccountModel = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profileId?: string;
};

export type ProfileModel = {
  _id: string;
  name: string;
  birthday: string;
  gender: string;
  height: number;
  weight: number;
  horoscope?: string;
  zodiac?: string;
  interests: string[];
  UserId: string;
};
