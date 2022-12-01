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


const SavePassword = () => {
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

  const formik = useFormik({
    initialValues: {
      username: "l",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      handleSingUp(values.username, values.email, values.password);
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("required field"),
      email: Yup.string().trim().required("required field"),
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
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
           register in our app 🔐
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
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
            {formik.errors.email ? <div>{formik.errors.email} </div> : null}
            <input
              className="border-b border-gray-300 w-full px-2 h-8 rounded focus:border-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email ? <div>{formik.errors.email} </div> : null}
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
              Регистрация
            </button>
            <a href="/login">Я уже зарегестрирован</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavePassword;
