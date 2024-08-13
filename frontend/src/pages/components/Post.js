import React from 'react'

export default function Post(props) {
  return (
    <tr>
      <td>{props.post.user}</td>
      <td>{props.post.content}</td>
      <td>{props.post.content} && (
        <img 
        src={`data:image/jpeg;base64,${props.post.image}`}
        alt={''}
        style={{maxWidth: '100px', maxHeight: '100px', objectFit: 'cover'}}
        />
      )
      </td>
      <td><button onClick={() => props.deletePost(props.post._id)}>Delete</button></td>
    </tr>
  )
}
