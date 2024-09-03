import { Alert } from 'antd';

export default function NotFound() {
  return <Alert message="Ошибка 404" description="К сожалению, указанная страница не найдена" type="error" />;
}
