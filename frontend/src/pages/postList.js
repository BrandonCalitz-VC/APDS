import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './components/Post';
export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch('https://localhost:3001/post');
      if(!response.ok){
        const message = "An Error Has Occurred: " + response.statusText;
        window.alert(message);
        return;
      }

      const posts = await response.json();
      setPosts(posts);
    }

    getPosts();
  }, [posts.length])


  async function deletePost(id) {
    const token = localStorage.getItem('jwt');
    await fetch('https://localhost:3001/posts/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  }


  function PostList(){
    return posts.map((post) => {
      return <Post post={post} deletePost={deletePost} key={post._id}/>;
    })
  }

  return (
    <div>
      <div className='container'>
        <h3 className='header'> APDS Notice Board</h3>
        <table className='table table-striped' style={{marginTop :20}}>
          <thead>
            <tr>
              <th>User</th>
              <th>Caption</th>  
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {PostList()}
          </tbody>
        </table>
      </div>
    </div>
  )
}
