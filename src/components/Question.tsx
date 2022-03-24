import '../styles/question.scss'
import cx from 'classnames'
type QuestionProps = {
  content : string;
  author : {
    name: string;
    avatar : string;
  }
  children: React.ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({content , author, children , isAnswered = false , isHighLighted =false}:QuestionProps) {
  
  return(
  /*   <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highLighted' :''}`}>
     refatorando com cx*/
  <div className={cx('question' , {answered : isAnswered , highlighted : isHighLighted && !isAnswered})}>
     <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.name}/>
        <span>{author.name}</span>
      </div>
      <div>{children}</div>
    </footer>
  </div>
  )
  
}