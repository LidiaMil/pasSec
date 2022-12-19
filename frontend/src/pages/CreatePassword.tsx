import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useSWR from 'swr';
import { RootState } from "../store";
import authSlice from "../store/slices/auth";
import { fetcher } from "../utils/axios";
import { UserResponse } from "../utils/types";
import axios from "axios";

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
  const [checkedState, setCheckedState] = useState(
    new Array(5).fill(false)
  );
  const [password, setPassword] = useState([]);

  // @ts-ignore
  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)

  const handleLogout = () => {
    dispatch(authSlice.actions.setLogout());
    history.push("/login");
  };

  const handleChange =()=>{
    console.log(setCheckedState,'checkedState', checkedState)
    axios
    .post(`${process.env.REACT_APP_API_URL}password/generate/`, { checkedState, count: 5, length:10 })
    .then((res) => {
      console.log(res,'reeees---------')
      console.log(res.data,'res.data')
      // history.push("/list", {
      //   userId: res.data.id
      // });
      setPassword(res.data)
    })
    .catch((err) => {
      console.log(err,'reeees---------')
    });
  };

  function PasswordList(props: any) {
    const passwords = props.passwords;
    const listItems = passwords.map((password: string) =>
      <li>{password}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  
  const handleOnChange = (position:number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    console.log(position,'position')
  };

  return (
    <div className="w-full h-screen">
    <div className="w-full p-6">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hexagon" viewBox="0 0 16 16">
  <path d="M14 4.577v6.846L8 15l-6-3.577V4.577L8 1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z"></path>
</svg>
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
            password ? 
            <div className="w-full text-center items-center">
                <PasswordList passwords={password} /> 
            </div>
            : <div></div>

      }
      <div className="d-flex gap-5 justify-content-center">
  <div className="list-group mx-0 w-auto">
    <form>
      <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value="Numbers" checked={checkedState[0]} onChange={() => handleOnChange(0)}/>
      <span>
        Цифры
        <small className="d-block text-muted">от 0 до 9</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value="LowerCase"  checked={checkedState[1]} onChange={() => handleOnChange(1)}/>
      <span>
        Строчные буквы
        <small className="d-block text-muted">a-z</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value="UpperCase"  checked={checkedState[2]} onChange={() => handleOnChange(2)}/>
      <span>
        Заглавные буквы
        <small className="d-block text-muted">A-Z</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value="SpecialSymbols"  checked={checkedState[3]} onChange={() => handleOnChange(3)}/>
      <span>
        Специальные символы
        <small className="d-block text-muted">! " # $ % & ' ( ) * + , - . / : ; = ? @ [ \ ] ^ _`  | ~ </small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="checkbox" value="UniqueSymbols"  checked={checkedState[4]} onChange={() => handleOnChange(4)}/>
      <span>
        Избегать повторения символов
      </span>
    </label>
{/* 

    <div className="list-group mx-0 w-auto">
  <label className="form-label">Количество паролей</label>
  <input type="range" className="form-range" id="customRange1"/>
  <label className="form-label">Длина паролей</label>
  <input type="range" className="form-range" id="customRange1"/>

  </div> */}
    </form>
    <div className="w-full h-screen">

      <div className="w-full p-6">
        <button
          onClick={handleChange}
          className="btn btn-primary"
        >
          Сгенерировать
        </button>
      </div>
      </div>

  </div>



</div>
  </div>

  );
};

export default CreatePassword;
