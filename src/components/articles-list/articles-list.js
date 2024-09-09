import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin, Pagination, Alert } from 'antd';

import { fetchArticles } from '../../api/api_articles';
import { appSelectors } from '../../redux';
import { ArticleItem } from '../article-item';

import style from './articles-list.module.scss';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector(appSelectors.articles);
  const loading = useSelector(appSelectors.loading);
  const error = useSelector(appSelectors.error);
  const articlesCount = useSelector(appSelectors.articlesCount);

  const [paramsPage] = useSearchParams();
  const pageCurrent = paramsPage.get('page') ?? 1;

  useEffect(() => {
    dispatch(fetchArticles(pageCurrent));
  }, [dispatch, pageCurrent]);

  const switchPagination = (page) => {
    navigate(`?page=${page}`);
    dispatch(fetchArticles(page));
  };

  const spinner = loading && <Spin size="large" />;

  const elems = !loading ? (
    <>
      <ul className={style['articles-list__items']}>
        {articles.map((item, i) => {
          return <ArticleItem key={i} {...item} />;
        })}
      </ul>
      <Pagination
        defaultCurrent={1}
        current={pageCurrent}
        defaultPageSize={5}
        showSizeChanger={false}
        total={articlesCount}
        onChange={switchPagination}
      />
    </>
  ) : null;

  const errorMessage =
    error && articles.length > 0 ? (
      <Alert message="Упс, возникла ошибка!" description="К сожалению, указанная страница не найдена" type="error" />
    ) : null;

  return (
    <div className={style['articles-list']}>
      {spinner}
      {errorMessage}
      {elems}
    </div>
  );
}
