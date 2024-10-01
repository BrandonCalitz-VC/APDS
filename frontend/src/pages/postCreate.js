import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PostCreate() {
  const [form, setForm] = useState({
    user: '',
    content: '',
    image: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('name');
    if(savedUser){
      setForm({...form, user: savedUser});
    }else{
      navigate('/login');
    }
  }, [navigate]);

  function updateForm(value) {
    setForm((prev)=>{
      return {...prev, ...value}
    })
  };

  async function handleImageChnage(e) {
    const file = e.target.files[0];
    if(file){
      
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({...form, image: reader.result.split(',')[1]});
        }
        reader.readAsDataURL(file);
      } catch (error) {
        window.alert("Error reading Image file.");
      }
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const newpost = {...form};

    try {
      const response =await fetch('https://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newpost)
        })

        if(!response.ok){
          const message = "An Error Has Occurred: " + response.statusText;
          window.alert(message);
          return;
        }
        const data = await response.json();
        console.log(data);
        setForm({
          user: '',
          content: '',
          image: ''
        });
    navigate('/');
    } catch (error) {
       window.alert(error);
    }
    
  }

  
  return (
    <div className='container'>
      <h3 className='header'> Create Post</h3>
      <form className='form-group'>
        <div className='form-group'>

        </div>
      </form>
    </div>
  )
}
