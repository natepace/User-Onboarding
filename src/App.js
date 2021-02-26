import logo from './logo.svg';
import './App.css';
import Form from './Form';
import React, { useState, useEffect} from 'react'
import axios from 'axios';
import * as yup from 'yup';
import Schema from './Schema';
import Friend from './Friend';
const initialFormValues ={
  username: '',
  email: '',
  password: '',
  ///// DROPDOWN /////
  
  ///// RADIO BUTTONS /////
  
  ///// CHECKBOXES /////
  ToS: false,

}

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
}

const initialFriends = []
const initialDisabled = false


function App() {

  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)  


  const getFriends = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://buddies.com/api/friends`
    axios.get(`https://reqres.in/api/users`)
    .then(res => {
      setFriends(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  const postNewFriend = newFriend => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset
    axios.post(`https://reqres.in/api/users`, newFriend)
    .then(res=>{
      setFriends([res.data, ...friends])
    })
    .catch(err =>{
      console.log(err);
    })
    setFormValues(initialFormValues)   
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    yup.reach(Schema, name)
      .validate(value)
      .then(()=>{
        //happy path
        setFormErrors({...formErrors, [name]: ''})
      })
        .catch((err)=>{
          setFormErrors({...formErrors, [name]: err.errors[0]})
        })
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      // role: formValues.role.trim(),
      // civil: formValues.civil.trim(),
      // 🔥 STEP 7- WHAT ABOUT HOBBIES?
      // hobbies: ['hiking','coding','reading'].filter(hobby => formValues[hobby])
      
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend)
    
  }


  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    Schema.isValid(formValues).then(valid => setDisabled(!valid))

  }, [formValues])
  return (
    // <div className="App">
          <div className='container'>
      <header><h1>This is the app right here.</h1></header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        // friends = {friends}
        getFriends = {getFriends}

      //   {...friends.map(friend=>{
      //     return(
      //         <h2>{friend.first_name}</h2>
           
      //     )
      // })}
      />

    {/* {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      } */}
 

{/* // </div> */}

       <div>
       {JSON.stringify(friends)}
      </div> 
      // {/* {
      //   friends.map(friend => {
      //     return (
      //       <Friend key={friend.id} details={friend} />
      //     )
      //   })
      // } */}
   
</div>

      // {/* <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header> */}
    
  );
}

export default App;
