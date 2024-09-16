import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { appSelectors } from '../../redux';
import { fetchCreateArticle, fetchEditArticle } from '../../api/api_articles';

import style from './new-article.module.scss';

export default function NewArticle({
  pageName = 'Create new article',
  title = '',
  description = '',
  body = '',
  tagList = [],
}) {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(appSelectors.loading);

  const [tagsArr, setTagsArr] = useState(tagList);
  const [tagInput, setTagInput] = useState('');

  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    if (pageName === 'Edit article') {
      setTagsArr(tagList);
      let defaultValues = {};
      defaultValues.title = title;
      defaultValues.description = description;
      defaultValues.body = body;
      reset({ ...defaultValues });
    }
  }, [tagList]);

  const onSubmit = (values) => {
    const formData = {
      article: {
        title: values.title.trim(),
        description: values.description.trim(),
        body: values.body.trim(),
        tagList: tagInput ? [...tagsArr, tagInput] : [...tagsArr],
      },
    };

    const articleData = JSON.stringify(formData);

    if (pageName === 'Edit article') {
      dispatch(fetchEditArticle([slug, articleData])).then((result) => navigate(`/articles/${result.payload.slug}`));
    } else {
      dispatch(fetchCreateArticle(articleData)).then((result) => navigate(`/articles/${result.payload.slug}`));
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    if (!tagsArr?.includes(ref.current.value) && ref.current.value.length) {
      setTagInput('');
      const newArr = [...tagsArr, ref.current.value];
      ref.current.value = '';
      setTagsArr(newArr);
    }
  };

  const deleteTag = (e, tag) => {
    e.preventDefault();
    const newArray = tagsArr.filter((item) => item !== tag);
    setTagsArr(newArray);
  };

  const changeTagsArr = (e, tag) => {
    const newItem = e.target.value;
    const newArr = tagsArr.map((item) => {
      if (item === tag) {
        item = newItem;
      }
      return item;
    });
    setTagsArr(newArr);
  };

  const tags = tagsArr.map((tag, i) => (
    <div key={i} className={style['form__wrapper']}>
      <input
        className={style.input}
        defaultValue={tag}
        type="text"
        name="tag"
        placeholder="Tag"
        readOnly="readonly"
        onChange={(e) => changeTagsArr(e, tag)}
      />
      <button data-tag={tag} className={style['btn__delete']} onClick={(e) => deleteTag(e, tag)}>
        Delete
      </button>
    </div>
  ));

  return (
    <div className={style['new-article']}>
      <h1 className={style['new-article__title']}>{pageName}</h1>
      <form className={style['new-article__form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={style['label__input']} htmlFor="title">
          Title
        </label>
        <input
          className={style.input}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          {...register('title', {
            required: 'Required field',
            maxLength: {
              value: 4999,
              message: 'Maximum 4999 characters',
            },
          })}
          style={errors.title && { borderColor: 'rgba(245, 34, 45)' }}
        />

        {errors.title && (
          <div className={style['error_message']}>
            <p>{errors?.title?.message}</p>
          </div>
        )}

        <label className={style['label__input']} htmlFor="description">
          Short description
        </label>
        <input
          className={style.input}
          type="text"
          name="description"
          id="description"
          placeholder="Short description"
          {...register('description', {
            required: 'Required field',
          })}
          style={errors.description && { borderColor: 'rgba(245, 34, 45)' }}
        />

        {errors.description && (
          <div className={style['error_message']}>
            <p>{errors?.description?.message}</p>
          </div>
        )}

        <label className={style['label__input']} htmlFor="text">
          Text
        </label>
        <textarea
          className={style.input}
          name="text"
          id="text"
          rows="6"
          placeholder="Text"
          {...register('body', {
            required: 'Required field',
          })}
          style={errors.body && { borderColor: 'rgba(245, 34, 45)' }}
        ></textarea>

        {errors.body && (
          <div className={style['error_message']}>
            <p>{errors?.body?.message}</p>
          </div>
        )}

        <label className={style['label__input']}>
          Tags
          {tags}
          <div className={style['form__wrapper']}>
            <input
              ref={ref}
              className={style.input}
              type="text"
              name="tag"
              id="tag"
              placeholder="Tag"
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button className={style['btn__delete']} disabled={loading} onClick={(e) => deleteTag(e)}>
              Delete
            </button>
            <button className={style['btn__add-tag']} disabled={loading} onClick={(e) => addTag(e)}>
              Add tag
            </button>
          </div>
        </label>
        <button className={style['btn__submit']} disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}
