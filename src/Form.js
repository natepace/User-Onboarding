import react, { useState, useEffect} from 'react'
export default function Form(props){
    const{
        values,
        submit,
        change,
        disabled,
        errors,  
        friends,
        getFriends,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
        getFriends()
      }

    const onChange = evt => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
      }


    return (

<div>
        <form onSubmit={onSubmit}>
              <button disabled ={disabled}>submit</button>
            <label>username
                <input
                    values={values.username}
                    onChange={onChange}
                    name='username'
                    type='text'
                />
            </label>

            <label>email
                <input
                    values={values.email}
                    onChange={onChange}
                    name='email'
                    type='email'
                />
            </label>

            <label>password
                <input
                    values={values.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                />
            </label>

            <label>Terms of Service
                <input 
                    type='checkbox'
                    name='ToS'
                    onChange={onChange}
                    checked={values.ToS}                
                />
            </label>

        </form>
        {/* <div> */}
            {/* {friends.map(friend=>{
                return(
                    <h2>{friend.first_name}</h2>
                 
                )
            })} */}

        {/* </div> */}
        </div>
    )
}