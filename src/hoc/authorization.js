import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { appSelectors } from '../redux';

export default function Authorization({ children }) {
  const location = useLocation();

  const user = useSelector(appSelectors.userObj);
  const username = user?.username ?? localStorage.getItem('username');

  if (!username) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}
