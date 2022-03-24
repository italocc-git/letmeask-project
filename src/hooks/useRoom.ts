import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./AuthContext"

type FirebaseQuestions = Record<string, { //chave é uma string e o resto é obj
  author: {
    name:string;
    avatar:string;
  }
  content : string;
  isAnswered : boolean;
  isHighlighted : boolean;
  likes : Record<string , {
    authorId : string;
  }>
}> //declarando tipagem de um novo objeto



type QuestionType = {
  id: string;
  author: {
    name:string;
    avatar:string;
  }
  content : string;
  isAnswered : boolean;
  isHighlighted : boolean;
  likeCount:number;
  likeId : string | undefined;
}


export function useRoom(roomId : string) {
  const {user} = useAuth()
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value' , room => {
      const databaseRom = room.val();
      const firebaseQuestions : FirebaseQuestions = databaseRom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content : value.content,
          author : value.author,
          isHighlighted : value.isHighlighted,
          isAnswered : value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId : Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRom.title)
      setQuestions(parsedQuestions)
    })
    return () => {
      roomRef.off('value')//Desligar event listener(on)
    }
    

  },[roomId, user?.id])
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title , setTitle] = useState('')
 

  return {
    questions, 
    title
  }
}