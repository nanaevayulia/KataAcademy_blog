import style from './new-article.module.scss';

const NewArticle = () => {
  return (
    <div className={style['new-article']}>
      <h1 className={style['new-article__title']}>Create new article</h1>
      <form className={style['new-article__form']}>
        <label className={style['label__input']} htmlFor="title">
          Title
        </label>
        <input className={style.input} type="text" name="title" id="title" placeholder="Title" />
        <label className={style['label__input']} htmlFor="description">
          Short description
        </label>
        <input className={style.input} type="text" name="description" id="description" placeholder="Title" />
        <label className={style['label__input']} htmlFor="text">
          Text
        </label>
        <textarea className={style.input} name="text" id="text" rows="6" placeholder="Text"></textarea>
        <label className={style['label__input']}>
          Tags
          <input className={style.input} type="text" name="tag" id="tag" placeholder="Tag" />
          <button className={style['btn__delete']}>Delete</button>
          <button className={style['btn__add-tag']}>Add tag</button>
        </label>
        <button className={style['btn__submit']}>Send</button>
      </form>
    </div>
  );
};

export default NewArticle;
