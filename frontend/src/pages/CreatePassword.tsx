import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useSWR from 'swr';
import { RootState } from "../store";
import authSlice from "../store/slices/auth";
import { fetcher } from "../utils/axios";
import { UserResponse } from "../utils/types";

interface LocationState {
    userId: string;
}

//тут надо создать страницу генерации паролей
// сколько паролей
// длина желаемых паролей
// допустимы символы
// функция копирования

const CreatePassword = () => {
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
      <li><a href="/list" className="nav-link px-2 link-dark">Сохраненные пароли</a></li>
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
              <div className="w-full text-center items-center">
                  <p className="self-center">Welcome, {user.data?.username}</p>
              </div>
              :
              <p className="text-center items-center">Loading ...</p>
      }
      <div className="d-flex gap-5 justify-content-center">
  <div className="list-group mx-0 w-auto">
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
      <span>
        Цифры
        <small className="d-block text-muted">от 0 до 9</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
      <span>
        Строчные буквы
        <small className="d-block text-muted">a-z</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
      <span>
        Заглавные буквы
        <small className="d-block text-muted">A-Z</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
      <span>
        Специальные символы
        <small className="d-block text-muted">! " # $ % & ' ( ) * + , - . / : ; = ? @ [ \ ] ^ _`  | ~ </small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value=""/>
      <span>
        Избегать повторения символов
      </span>
    </label>
  </div>

  <div className="list-group mx-0 w-auto">
  <label className="form-label">Количество паролей</label>
  <input type="range" className="form-range" id="customRange1"/>
  <label className="form-label">Длина паролей</label>
  <input type="range" className="form-range" id="customRange1"/>

  </div>

</div>
      <div className="col-md-8 text-end">
        <button
          // onClick={handleLogout}
          className="btn btn-primary"
        >
          Сгенерировать
        </button>
      </div>
  </div>

  );
};

export default CreatePassword;
