import React from 'react';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import useAppointmentService from './service/AppointmentService';
import { Suspense } from 'react';
import AddItem from './addDeletePushItems/addItem';
import {GridRowSelectionModel, GridRenderCellParams} from '@mui/x-data-grid';
import { MouseEvent } from 'react';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';







const TablePage = lazy(() => import('./tablePage'));

function RegPanel({handleChangeName, handleChangePassword, handleSubmit}:{handleChangeName: any, handleChangePassword: any, handleSubmit: any}) {
return (
  <>
      <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <input name="username" type='text' onChange={handleChangeName}/>
          <br/>
          <input name="password" type='text' onChange={handleChangePassword}/>
          <br/>
          <input type="submit" value="Отправить" />
      </form>
  </>
 
)
}

function Loading() {
return <h2>🌀 Loading...</h2>;
}

function App() {
  const {authorizationRequest, getData, deleteItem, changeItem} = useAppointmentService();
  const [name, setName] = useState({username: ''});
  const [password, setPassword] = useState({password: ''});
  const [tableData, setTableDate] = useState([]);
  const [showIputs, setshowInputs] = useState(false);
  const [deleteItems, setDeleteItems] = useState<GridRowSelectionModel>();

  const columns = [
    { field: 'id', minWidth: 150, headerName: 'ID'},
    { field: 'companySigDate', headerName: 'companySigDate',minWidth: 150, editable: true },
    { field: 'companySignatureName', headerName: 'companySignatureName',minWidth: 150,editable: true },
    { field: 'documentName', headerName: 'documentName', minWidth: 150, editable: true },
    { field: 'documentStatus', headerName: 'documentStatus', minWidth: 150, editable: true },
    { field: 'documentType', headerName: 'documentType', minWidth: 150, editable: true },
    { field: 'employeeNumber', headerName: 'employeeNumber', minWidth: 150, editable: true },
    { field: 'employeeSigDate', headerName: 'employeeSigDate', minWidth: 150, editable: true },
    { field: 'employeeSignatureName', headerName: 'employeeSignatureName', minWidth: 150, editable: true },
    { field: 'filledQuantity', renderCell: () => {
      return(
        <>
      <CircularProgress variant="determinate" value={70} />
        </>
      )
      
    }, headerName: 'filledQuantity', width: 150, editable: false },
  ]


  const handleChangeName = (e: any) => {
    setName({username: e.target.value})
  }
  const handleChangePassword = (e: any) => {
    setPassword({password: e.target.value})
  }
function handleSubmit(event: any) {
  const sendData = {username: '', password: ''};
  Object.assign(sendData, name, password);
  // console.log(JSON.stringify(sendData));
  authorizationRequest(sendData).then(data => {
    console.log(data.data.token);
    localStorage.setItem('token', data.data.token)
    if (data.data) {
      getData(data.data.token).then(data => {
        console.log(data.data)
        setTableDate(data.data);
      })
    }
    }
  );
  event.preventDefault();
}

const updateTableDate = () => {
  getData(localStorage.getItem('token')).then(data => {
    setTableDate(data.data);
})
}

  
  useEffect(() => {
    localStorage.getItem('token') ? getData(localStorage.getItem('token')).then(data => {
      console.log(data.data);
      setTableDate(data.data);
      // setShowReg(true);
    }) : console.log('no reg');
  },[])

  const showInputsItem = () => {
    setshowInputs(!showIputs)
  }

  const deleteItemFromBase = () => {
    // deleteItems
    // deleteItem(localStorage.getItem('token'), )
    // console.log(deleteItems?.length);
    if (deleteItems) {
      const arr = deleteItems.map(item => item);
      let numberOfRequests = arr.length;
      let count = 0;
      async function delFunc(count:any):Promise<any> {
          await deleteItem(localStorage.getItem('token'), arr[count])
          // await setTimeout(() => {return 2}, 3000)
          count++;  
            console.log('delllllited item');
          if (count < numberOfRequests) {
            return delFunc(count)
          } else {
            updateTableDate() 
            return;
          }
        } 
        delFunc(count);
    } 



    // const textConsole = (() => {
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('daaaataaaa')
    //     },3000)
    //   }).then((data) => console.log(data))
    // })()
    // const textConsole = (() => {
    //   new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('first promise')
    //     },3000)
    //     new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve('second promise')
    //       },1000)
    //     }).then((item) => console.log(item))
    //   }).then((data) => console.log(data))
    // })()
    let first = new Promise((resolve, reject) => {
      setTimeout(() => resolve("готово1!"), 2000)
    });
    let second = new Promise((resolve, reject) => {
      setTimeout(() => resolve("готово2!"), 1000)
    });

   (async function noName() {
        await first
        // await second
        console.log('first');
        // console.log(second);
    })()
  }

  const chooseItem = (rowSelection: GridRowSelectionModel) => {
    setDeleteItems(rowSelection)
  }

  const changeItemFromBase = (params:any) => {
    changeItem(params, localStorage.getItem('token'), params.id).then(update => updateTableDate())
  }

  const logOut = () => {
    localStorage.clear();
    window.location.reload(); 
  }

//  useEffect(() => {
//   interface ICUser {
//     name: string;
//     birthday: Date;
// }
// type UserConstructor = {
//       (name: string, birthday:Date): void
//   new (name: string, birthday:Date): ICUser;
// }
//   function User(this: ICUser, name:string, birthday:Date):void {
//     this.name = name;
//     this.birthday = birthday;
  
//     // возраст рассчитывается из текущей даты и дня рождения
//     // Object.defineProperty(this, "age", {
//     //   get() {
//     //     let todayYear = new Date().getFullYear();
//     //     return todayYear - this.birthday.getFullYear();
//     //   }
//     // });
   
//   }
  
//   let john = new (User as UserConstructor)("John", new Date(1992, 3, 9));
//   console.log(john);
//   class MyClass {
//     name
//     birthday
//     constructor(name:string, birthday:Date) {
//        this.name = name;
//        this.birthday = birthday;
//     }
//     get() {
//       return this.name
//     }
//   }
//   let john = new MyClass("John", new Date(1992, 3, 9));
// console.log(john.get());

// let user = {
//   _name: '',
//   get name() {
//     return this._name;
//   },

//   set name(value) {
//     if (value.length < 4) {
//       console.log("Имя слишком короткое, должно быть более 4 символов");
//       return;
//     }
//     this._name = value;
//   }
// };

// user.name = "Pete";
// console.log(user.name); // Pete

// user.name = ""; // Имя слишком короткое...
// interface ICUser {
//   username: string;
//   age: number
// }
// type UserConstructor = {
//       (username:string): void
//   new (username: string): void
// }
// function User(this:ICUser,username:string) {
//   this.username = username
// }

// User.prototype.age = 5

// let pavel = new (User as UserConstructor)('pavel');
// console.log(pavel.age);


//  },[])

 
  return (
    <>
    <div style={{display: "flex",position: "relative", justifyContent: "center", alignItems: "center", maxWidth: "100vw", maxHeight: "100vh",minHeight: '300px', flexWrap: "wrap", flexDirection: "column"}}>
       {!localStorage.getItem('token') ? <RegPanel handleChangeName={handleChangeName} handleChangePassword={handleChangePassword} handleSubmit={handleSubmit}/> : null}
       <Suspense fallback={<Loading/>}>
          <div style={{position: "relative",width:"80%"}} >
              {localStorage.getItem('token') ? <button onClick={logOut}>LogOut</button> : null}  
          </div>
          {localStorage.getItem('token') ? <TablePage tableData={tableData} columns = {columns} deleteItem = {chooseItem} changeItem={changeItemFromBase}/> : null}
      </Suspense>
      <div style={{position: "relative",width:"80%"}}>
          {localStorage.getItem('token') ? <button onClick={showInputsItem}>create item</button>:null}
          {tableData.length !== 0 ? <button onClick={deleteItemFromBase}>delete items</button>:null}
        <div style={{position: "relative",top: "20px"}}>
          {showIputs ? <AddItem updateTableDate={updateTableDate}/> : null}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;