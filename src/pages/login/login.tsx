import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/user/action';
import { isAuthorizedSelector } from '../../services/user/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  // const isAuthorized = useSelector(isAuthorizedSelector)
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    const userData = { email, password };
    console.log('Logging in user with data:', userData); //Отладка
    dispatch(loginUser(userData));
  };

  return (
    <LoginUI
      errorText={''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
