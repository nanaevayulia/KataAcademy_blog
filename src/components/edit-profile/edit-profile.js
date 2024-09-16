import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { appSelectors } from '../../redux';
import { fetchUserEdit, fetchUserResetErrors } from '../../api/api_user';

import style from './edit-profile.module.scss';

export default function EditProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserResetErrors());
  }, []);

  const userErrors = useSelector(appSelectors.userErrors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.username = localStorage.getItem('username');
    defaultValues.email = localStorage.getItem('email');
    defaultValues.avatar = localStorage.getItem('image');
    reset({ ...defaultValues });
  }, []);

  const onSubmit = (values) => {
    const formData = {
      user: {
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        image: values.avatar.trim(),
      },
    };

    const userData = JSON.stringify(formData);

    dispatch(fetchUserEdit(userData));
  };

  return (
    <div className={style.edit}>
      <h1 className={style['edit__title']}>Edit Profile</h1>
      <form className={style['edit__form']} onSubmit={handleSubmit(onSubmit)}>
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

        {errors.username && <div className={style['error_message']}>{errors.username.message}</div>}
        {userErrors?.username && <div className={style['error_message']}>This username {userErrors.username}</div>}

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
              value: /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/,
              message: 'Invalid email. Only lowercase letters, numbers and symbols . _ -',
            },
          })}
          style={errors?.email || userErrors?.email ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors?.email && <div className={style['error_message']}>{errors.email.message}</div>}
        {userErrors?.email && <div className={style['error_message']}>This email {userErrors.email}</div>}

        <label className={style['label__input']} htmlFor="new-password">
          New password
        </label>
        <input
          className={style.input}
          name="new-password"
          type="password"
          id="new-password"
          placeholder="New password"
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
          })}
          style={errors.username ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.password && <div className={style['error_message']}>{errors.password.message}</div>}

        <label className={style['label__input']} htmlFor="avatar">
          Avatar image (url)
        </label>
        <input
          className={style.input}
          name="avatar"
          type="url"
          id="avatar"
          placeholder="Avatar image"
          {...register('avatar', {
            pattern: {
              value: /((?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?)/,
              message: 'Invalid URL',
            },
          })}
          style={errors.username ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.avatar && <div className={style['error_message']}>{errors.avatar.message}</div>}

        <button className={style['btn__submit']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
