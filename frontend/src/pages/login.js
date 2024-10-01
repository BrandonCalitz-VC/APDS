import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    password: '',
  });
  function updateForm(value) {
    setForm((prev)=>{
      return {...prev, ...value}
    })
  }
  async function onSubmit(e) {
    e.preventDefault();
    const newperson = {...form};

    const response = await fetch('https://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newperson)
    }).catch((error) => {
      window.alert(error);
      return;
    });

    const data = await response.json();
    const { token, name } = data;
    console.log(name + " " + token);
    
    localStorage.setItem('jwt', token);
    localStorage.setItem('name', name);
    navigate('/');

    setForm({
      name: '',
      password: ''
    });
    navigate('/');
  }
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={form.name}
            onChange={(e) => updateForm({name: e.target.value})}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={form.password}
            onChange={(e) => updateForm({password: e.target.value})}
          />
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary' value='Login'/>
        </div>
      </form>
    </div>
  )
}
