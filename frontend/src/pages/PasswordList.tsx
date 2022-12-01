import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import authSlice from "../store/slices/auth";
import useSWR from 'swr';
import {fetcher} from "../utils/axios";
import {UserResponse} from "../utils/types";
import {RootState} from "../store";

interface LocationState {
    userId: string;
}

// тут отобразим все пароли 
// у каждого пароля методы
// изменить
// удалить
// посмотреть

const PasswordList = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const history = useHistory();
  // @ts-ignore
  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)

  const handleLogout = () => {
    dispatch(authSlice.actions.setLogout());
    history.push("/login");
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use href="#bootstrap"></use></svg>
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/create" className="nav-link px-2 link-secondary">Сгенерировать пароль</a></li>
        <li><a href="/list" className="nav-link px-2 link-dark">Схраненные пароли</a></li>
        <li><a href="/save" className="nav-link px-2 link-dark">Сохранить пароль</a></li>
      </ul>

      <div className="col-md-3 text-end">
        <button
          onClick={handleLogout}
          className="btn btn-primary"
        >
          Выйти
        </button>
      </div>
    </header>
      </div>
        {
            user.data ?
                <div className="w-full h-full text-center items-center">
                    <p className="self-center my-auto">Welcome, {user.data?.username}</p>
                </div>
                :
                <p className="text-center items-center">Loading ...</p>
        }
    </div>
  );
};

export default PasswordList;
