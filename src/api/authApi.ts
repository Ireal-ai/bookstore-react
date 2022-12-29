import axios from './axios';
import { AuthResponse } from '../types';

type SignInOptions = {
  password: string;
  email: string;
}
type SignUpOptions = {
  password2: string;
  password: string;
  email: string;
}

type CheckRefreshResponse = {
  token: string;
  refreshToken: string;
}

const authPath = '/auth';

const signIn = (data: SignInOptions) => {
  return axios.post<AuthResponse>(`${authPath}/signin`, data);
};

const signUp = (data: SignUpOptions) => {
  return axios.post<AuthResponse>(`${authPath}/signup`, data);
};

const checkRefresh = (refreshToken: string) => {
  return axios.post<CheckRefreshResponse>(`${authPath}/check-token`, { refreshToken });
};

export default {
  signIn,
  signUp,
  checkRefresh,
};
