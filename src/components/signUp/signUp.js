import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { appSelectors } from '../../redux';
import { fetchUserSignUp, fetchUserResetErrors } from '../../api/api_user';

import style from './signUp.module.scss';

export default function SignUp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserResetErrors());
  }, []);

  const [password, setPassword] = useState(null);

  const { token, loading } = useSelector(appSelectors.userObj);
  const userErrors = useSelector(appSelectors.userErrors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'all', defaultValues: { checkbox: true } });

  const onSubmit = (values) => {
    const formData = {
      user: {
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      },
    };

    const userData = JSON.stringify(formData);

    dispatch(fetchUserSignUp(userData));

    if (token) {
      reset();
    }
  };

  if (token) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={style.signUp}>
      <h1 className={style['signUp__title']}>Create new account</h1>
      <form className={style['signUp__form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={style['label__input']} htmlFor="username">
          Username
        </label>
        <input
          className={style.input}
          name="username"
          type="text"
          id="username"
          placeholder="Username"
          {...register('username', {
            required: 'Required field',
            minLength: {
              value: 3,
              message: 'Minimum 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters',
            },
          })}
          style={errors?.username || userErrors?.username ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors?.username && <div className={style['error_message']}>{errors?.username?.message}</div>}
        {userErrors?.username && (
          <div className={style['error_message']}>User with this name {userErrors.username}</div>
        )}

        <label className={style['label__input']} htmlFor="email">
          Email address
        </label>
        <input
          className={style.input}
          name="email"
          type="email"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: 'Required field',
            pattern: {
              value: /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9_-]+/,
              message: 'Invalid email. Only lowercase letters, numbers and symbols . _ -',
            },
          })}
          style={errors?.email || userErrors?.email ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors?.email && <div className={style['error_message']}>{errors?.email?.message}</div>}
        {userErrors?.email && <div className={style['error_message']}>This email {userErrors.email}</div>}

        <label className={style['label__input']} htmlFor="password">
          Password
        </label>
        <input
          className={style.input}
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'Required field',
            minLength: {
              value: 6,
              message: 'Minimum 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Maximum 40 characters',
            },
            onChange: (e) => setPassword(e.target.value),
          })}
          style={errors.password ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.password && <div className={style['error_message']}>{errors?.password?.message}</div>}

        <label className={style['label__input']} htmlFor="repeat-password">
          Repeat Password
        </label>
        <input
          className={style.input}
          name="repeat-password"
          type="password"
          id="repeat-password"
          placeholder="Password"
          {...register('confirm', {
            required: 'Required field',
            validate: (value) => value === password || 'Passwords must match',
          })}
          style={errors.confirm ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.confirm && <div className={style['error_message']}>{errors?.confirm?.message}</div>}

        <div className={style['checkbox__container']}>
          <input
            className={style.checkbox}
            type="checkbox"
            name="check-agree"
            id="check-agree"
            {...register('checkbox', {
              required: 'Required checkbox',
            })}
            style={errors.checkbox ? { accentColor: 'rgba(245, 34, 45)' } : null}
          />
          <label className={style['label__checkbox']} htmlFor="check-agree">
            I agree to the processing of my personal information
          </label>

          {errors.checkbox && <div className={style['error_message_checkbox']}>{errors?.checkbox?.message}</div>}
        </div>

        <button className={style['btn__submit']} disabled={loading}>
          Create
        </button>
      </form>

      <span className={style['signUp__have-an-account']}>
        Already have an account?&nbsp;
        <Link to="/sign-in" className={style['signUp__link']}>
          Sign In.
        </Link>
      </span>
    </div>
  );
}
