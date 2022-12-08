import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useSWR from 'swr';
import { RootState } from "../store";
import authSlice from "../store/slices/auth";
import { fetcher } from "../utils/axios";
import { PasswordResponse, UserResponse } from "../utils/types";
import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';

interface TableState {
  columns: any;
  data: any;
}

// тут отобразим все пароли 
// у каждого пароля методы
// изменить
// удалить
// посмотреть
// функция копирования


function Table({ columns, data }: TableState) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  // Render the UI for your table
  return (
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </BTable>
  )
}

const PasswordList = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [eye, setEye] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword =()=>{
    console.log(passwordType,'passwordType')
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }
  // @ts-ignore
  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)
  const password = useSWR<PasswordResponse, []>(`/password/view/`, fetcher)
  console.log(password.data,'password', user)

  const columns = useMemo(
    () => [
      {
        Header: 'Менеджер паролей',
        columns: [
          {
            width: 300,
            Header: 'site',
            accessor: 'site',
          },
          {
            width: 150,
            Header: 'username',
            accessor: 'username',
          },
          {
            width: 150,
            Header: 'password',
            accessor: 'password',
            Cell: () => (
              <p>
                { passwordType!=="password"? '***********' : 'password.data'}
              </p>
              ),
          },
          {
            width: 40,
            Header: 'look',
            accessor: 'look',
            Cell: () => (
            <button onClick={togglePassword}>
{ passwordType==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
</svg>}
</button>
              )
          },
          {
            width: 40,
            Header: 'action',
            accessor: 'action',
            Cell: () => (
              <div>
                <button onClick={handleOpen}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
  </svg></button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={deletePassword}>Удалить пароль</button>
            </li>
            <li className="menu-item">
              <button onClick={changePassword}>Изменить пароль</button>
            </li>
          </ul>
        ) : null} 
              </div>
      )
          },
        ],
      },
    ],
    []
  )
  const handleLogout = () => {
    dispatch(authSlice.actions.setLogout());
    history.push("/login");
  };


  const handleOpen = () => {
    setOpen(!open);
  };


  const handleOpenEye = () => {
    setEye(!eye);
  };

  const lookPassword = () => {
    // показать пароль
    setOpen(false);
  };

  const deletePassword = () => {
    // удаление пароля
    setOpen(false);
  };

  const changePassword = () => {
    // изменение пароля
    setOpen(false);
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
      <div className="h-screen bg-gray-bg">
<div className="w-full m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-1 px-3">
      {
          password.data ?
              <div className="w-full h-full text-center items-center">
                   <Table columns={columns} data={password.data} />
              </div>
              :
              <p className="text-center items-center">Loading ...</p>
      }
    </div>
    </div>
    </div>
  );
};

export default PasswordList;
