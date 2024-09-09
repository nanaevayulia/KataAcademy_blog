import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchUserEdit } from '../../redux/userSlice';

import style from './edit-profile.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate('/');
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
          style={errors.username ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.username && (
          <div className={style['error_message']}>
            <p>{errors.username.message}</p>
          </div>
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
              value: /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/,
              message: 'Invalid email. Only lowercase letters, numbers and symbols . _ -',
            },
          })}
          style={errors.username ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.email && (
          <div className={style['error_message']}>
            <p>{errors.email.message}</p>
          </div>
        )}

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

        {errors.password && (
          <div className={style['error_message']}>
            <p>{errors.password.message}</p>
          </div>
        )}

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

        {errors.avatar && (
          <div className={style['error_message']}>
            <p>{errors.avatar.message}</p>
          </div>
        )}

        <button className={style['btn__submit']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
