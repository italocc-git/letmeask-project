import React, { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button';
import {Link , useHistory  } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext';
import { database } from '../services/firebase';


export const NewRoom: React.FC = () => {
  const [newRoom, setNewRoom] = useState('')
  const {user} = useAuth();
  const history = useHistory()

  async function handleCreateRoom(event : FormEvent){
    event.preventDefault()

    if(newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId : user?.id
    })
    history.push(`/rooms/${firebaseRoom.key}`)
  }
  return (
  <div id='page-auth'>
    <aside>
      <img  src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas'/>
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </aside>
    <main>
      <div className='main-content'>
        <img src={logoImg} alt="letmeask"/>
        <h2>Criar uma nova sala</h2>
        <form action="" onSubmit={handleCreateRoom}>
          <input type="text" onChange={(event) => setNewRoom(event.target.value)}
            placeholder='Digite o Código da sala' value={newRoom}
          />
          <Button type='submit'>Criar Sala</Button>
        </form>
        <p>
          Quer entrar em uma sala existente <Link to='/'>Clique aqui</Link>
        </p>
      </div>
    </main>
  </div>
  )  
}
