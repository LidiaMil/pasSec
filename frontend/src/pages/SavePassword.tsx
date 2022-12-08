import React, { useState }  from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import authSlice from "../store/slices/auth";
import useSWR from 'swr';
import {fetcher} from "../utils/axios";
import {UserResponse} from "../utils/types";
import {RootState} from "../store";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

interface LocationState {
    userId: string;
}

//тут надо создать красивые поля input 
// сайт, логин и пароль от сайта
// селект для выбора метода 
// и кнопка сохранить
// редиркет на список паролей

const SavePassword = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)

  const handleLogout = () => {
    dispatch(authSlice.actions.setLogout());
    history.push("/login");
  };

  const handleSavePassword = (site:string, username: string, password: string, method_id = 1 ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}password/save/`, { site, username, password, method_id, user_id: userId })
      .then((res) => {
        console.log(res,'reeees---------')
        // dispatch(authSlice.actions.setAccount(res.data.user));
        setLoading(false);
        console.log(res.data,'res.data')
        history.push("/list", {
          userId: res.data.id
        });
      })
      .catch((err) => {
        setMessage(err.response.data.detail);
      });
  };

  const formik = useFormik({
    initialValues: {
      site: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleSavePassword(values.site, values.username, values.password);
    },
    validationSchema: Yup.object({
        site: Yup.string().trim().required("required field"),
        username: Yup.string().trim().required("required field"),
        password: Yup.string().trim().required("required field"),
    }),
  });

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

  <div className="list-group mx-0 w-auto">
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios1" value=""/>
      <span>
        Метод 1
        <small className="d-block text-muted">Описание преимущества метода 1</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios2" value=""/>
      <span>
      Метод 2
        <small className="d-block text-muted">Описание преимущества метода 2</small>
      </span>
    </label>
    <label className="list-group-item d-flex gap-2">
      <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios3" value=""/>
      <span>
      Метод 3
        <small className="d-block text-muted">Описание преимущества метода 3</small>
      </span>
    </label>
  </div>
    <div className="h-screen bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
           Сохранить пароль
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
          <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="site"
              type="site"
              placeholder="Site"
              name="site"
              value={formik.values.site}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="username"
              type="username"
              placeholder="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div>{formik.errors.password} </div>
            ) : null}
          </div>
          <div className="text-danger text-center my-2" hidden={false}>
            {message}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded border-gray-300 p-2 w-32 bg-blue-700 text-white"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default SavePassword;
