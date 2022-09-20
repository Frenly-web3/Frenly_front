import React from 'react'
import Comment, { IComment } from './comment/Comment'

const Comments = ({comments}:any) => {
  return (
    <div className='flex flex-col py-4'>
      <h4 className='text-xl font-bold'>Comments</h4>
      {comments?.map((comment:IComment)=><Comment {...comment}/>)}
    </div>

  )
}

export default Comments