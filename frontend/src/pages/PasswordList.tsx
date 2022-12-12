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
import axios from "axios";

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

  // @ts-ignore
  const userId = account?.id;

  const user = useSWR<UserResponse>(`/user/${userId}/`, fetcher)
  const password = useSWR<PasswordResponse, []>(`/password/view/`, fetcher)
  console.log(password.data)
  //пофиксить тут хардкод
  const [passwordType, setPasswordType] =  useState(
    new Array(10).fill([true,true])
  );

  const togglePassword =(id: any, index: any)=>{
    console.log(index,'togglePassword')
    const position = index

    const updatedCheckedState = passwordType.map((item, index) => {
      if(index === position ){
        item = [!item[0],item[1]]
      } else item = [item[0],item[1]]
      console.log(item,'itemitemitemitem')
      return item
    });

    setPasswordType(updatedCheckedState);
    console.log(updatedCheckedState,'---togglePasswordpasswordTypepasswordType---', passwordType)

    console.log(passwordType[index],'togglePassword', index, id)

  }

  const columns = useMemo(
    () => [
      {
        Header: 'Менеджер паролей',
        columns: [
          {
            width: 300,
            Header: 'id',
            accessor: 'id',
          },
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
            Cell: (password:any) => 
              (
              <p>
                { passwordType[password.row.index][0] == false? '***********' : password.value}
              </p>
              ),
          },
          {
            width: 40,
            Header: 'look',
            accessor: 'look',
            Cell: ({ cell }) => (
            <button onClick={() => togglePassword(cell.row.cells[0].value, cell.row.index)}>
{ passwordType[cell.row.index][0] ==false? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
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
            Cell: ({ cell }) => (
              <div>
                <button onClick={() => handleOpen(cell.row.cells[0].value, cell.row.index)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
  </svg></button>
        {passwordType[cell.row.index][1]==true? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={() => deletePassword(cell.row.cells[0].value)}>Удалить пароль</button>
            </li>
            <li className="menu-item">
              <button onClick={() => changePassword(cell.row.cells[0].value)}>Изменить пароль</button>
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


  const handleOpen = (id:any, index: number) => {
    const position = index
    const updatedCheckedState = passwordType.map((item, index) => 
    index === position ? [item[0],!item[1]] : [item[0],item[1]]
    );

    console.log(updatedCheckedState[index],'passwordType',index,id)
    setPasswordType(updatedCheckedState);
  };

  const deletePassword = (id: number) => {
    // удаление пароля
    console.log('handleDelete', id)
    axios
    .post(`${process.env.REACT_APP_API_URL}password/delete/`, { id })
    .then((res) => {
      console.log(res,'reeees---------')
      // dispatch(authSlice.actions.setAccount(res.data.user));
      console.log(res.data,'res.data')
      history.push("/list", {
        userId: res.data.id
      });
    })
    .catch((err) => {
      console.log(err.response.data.detail);
    });
    // setOpen(false);
  };

  const changePassword = (id: number) => {
    // изменение пароля
    console.log('changePassword', id)
    axios
    .post(`${process.env.REACT_APP_API_URL}password/update/`, { id })
    .then((res) => {
      console.log(res,'reeees---------')
      console.log(res.data,'res.data')
      history.push("/list", {
        userId: res.data.id
      });
    })
    .catch((err) => {
      console.log(err.response.data.detail);
    });

    // setOpen(false);
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
