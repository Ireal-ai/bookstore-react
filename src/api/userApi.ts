import axios from './axios';
import { Token, AuthResponse, User } from '../types';

type UpdateUserDataType = {
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

type UploadAvatarType = {
  img: string;
}

type UpdateUserResponse = {
  user: User;
}

const userPath = '/api/user';

const updateUser = (id: number, data: UpdateUserDataType) => {
  return axios.patch<UpdateUserResponse>(`${userPath}/${id}`, data);
};

const uploadAvatar = (data: UploadAvatarType) => {
  return axios.patch<UpdateUserResponse>(`${userPath}/upload-avatar`, data);
};

const checkToken = (data: Token) => {
  return axios.get<AuthResponse>(`${userPath}/me`, { data });
};

export default {
  updateUser,
  uploadAvatar,
  checkToken,
};
