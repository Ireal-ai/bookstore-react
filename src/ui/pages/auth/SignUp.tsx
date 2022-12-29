import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import YupString from 'yup/lib/string';
import YupObject from 'yup/lib/object';
import YupRef from 'yup/lib/Reference';

import authAPI from '../../../api/authApi';
import { routePath } from '../../../constants';
import { useAppDispatch } from '../../../store';
import { setUser } from '../../../store/userReducer';

import CommonButton from '../../components/CommonButton';
import CommonInputField from '../../components/CommonInputField';
import Wrapper from './Auth.styles';
import CommonWrapper from '../../components/CommonWrapper.styles';

import man from '../../images/man.png';
import hide from '../../images/hide.png';
import mail from '../../images/mail.png';

const signUpValidationSchema = new YupObject().shape({
  email: new YupString().email('Invalid email address').required('Required'),
  password: new YupString().required('Required'),
  passwordRepeat: new YupString().when('password', {
    is: (value: string) => (Boolean(value && value.length > 0)),
    then: new YupString().oneOf(
      [new YupRef('password')],
      'Both passwords need to be the same',
    ),
  }),
});

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authAPI.signUp({
          email: values.email,
          password: values.password,
          password2: values.passwordRepeat,
        });
        dispatch(setUser(response.data.user));

        return navigate(`${routePath.home}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 403) {
            formik.setErrors({
              email: error.response?.data.data.message,
            });
          }
        }
      }
    },
  });

  return (
    <CommonWrapper>
      <Wrapper>
        <form
          className="form-wrapper"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="title">
            Sign Up
          </h1>

          <div className="input-wrapper">
            <CommonInputField
              icon={mail}
              name="email"
              placeholder="Email"
              fieldInputProps={formik.getFieldProps('email')}
              error={formik?.touched.email ? formik?.errors.email : ''}
            />
            <p className="form__text">
              Enter your email
            </p>

            <CommonInputField
              icon={hide}
              type="password"
              name="password"
              placeholder="Password"
              fieldInputProps={formik.getFieldProps('password')}
              error={formik?.touched.password ? formik?.errors.password : ''}
            />
            <p className="form__text">
              Enter your password
            </p>

            <CommonInputField
              icon={hide}
              type="password"
              name="passwordRepeat"
              placeholder="Password replay"
              fieldInputProps={formik.getFieldProps('passwordRepeat')}
              error={formik?.touched.passwordRepeat ? formik?.errors.passwordRepeat : ''}
            />
            <p className="form__text">
              Repeat your password without errors
            </p>
          </div>
          <CommonButton
            size="permanent"
            text="Sign up"
          />
        </form>
        <img
          className="image"
          src={man}
        />
      </Wrapper>
    </CommonWrapper>
  );
};

export default SignUpForm;
