import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { appSelectors } from '../../redux';
import { fetchUserSignIn } from '../../redux/userSlice';

import style from './signIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useSelector(appSelectors.userObj);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (values) => {
    const formData = {
      user: {
        email: values.email,
        password: values.password,
      },
    };

    const userData = JSON.stringify(formData);
    dispatch(fetchUserSignIn(userData));

    if (token) {
      reset();
    }
    navigate('/');
  };

  return (
    <div className={style.signIn}>
      <h1 className={style['signIn__title']}>Sign In</h1>
      <form className={style['signIn__form']} onSubmit={handleSubmit(onSubmit)}>
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
              value: /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/,
              message: 'Invalid email. Only lowercase letters, numbers and symbols . _ -',
            },
          })}
          style={errors.email || error ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.email ? (
          <div className={style['error_message']}>
            <p> {errors?.email?.message}</p>
          </div>
        ) : null}

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
          })}
          style={errors.password || error ? { borderColor: 'rgba(245, 34, 45)' } : null}
        />

        {errors.password ? (
          <div className={style['error_message']}>
            <p> {errors?.password?.message}</p>
          </div>
        ) : null}

        <button className={style['btn__submit']} disabled={loading}>
          Login
        </button>
      </form>

      <span className={style['signIn__have-an-account']}>
        Don’t have an account?&nbsp;
        <Link to="/sign-up" className={style['signIn__link']}>
          Sign Up.
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
