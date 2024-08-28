import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUseres] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(
    ()=>{
      fetch("https://reqres.in/api/users").
        then(res => res.json()).
        then(json => 
          setUseres(json.data)
        ).catch(err => {
          console.warn(err);
          alert('Unhandled exeption');
        }).finally(()=>setIsLoading(false))
    }, []
  )

  const onClickInvite = ( id ) => {
    if(invites.includes(id)){
      setInvites((prev) => prev.filter((_id) => _id!==id))
    } 
    else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickSendInvites = () =>{
    setSuccess(true);
    console.log("success")
  }

  return (
    
    <div className="App">
      {
      success ? (
        <Success count={invites.length}/>
      ) :
      (
        <Users 
        onChangeSearchValue = {onChangeSearchValue}
        searchValue={searchValue} 
        items={users} isLoading={isLoading}
        onClickInvite = {onClickInvite}
        invites={invites}
        onClickSendInvites = {onClickSendInvites}/>
      )
    }
      
    </div>
  );
}

export default App;
