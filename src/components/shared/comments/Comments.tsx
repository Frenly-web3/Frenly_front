import { createComment } from '@store/lens/comment/create-comment';
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react'
import Comment, { IComment } from './comment/Comment'

const Comments = ({comments, pubId, profileId}:any) => {
  const [commentValue, setCommentValue] = useState('');
  
  const {library} = useEthers();
  
  
  async function commentHandler(){
    const res = await fetch('/api/comment', {method:"POST", body:JSON.stringify({comment:commentValue, pubId})});
    const data = await res.json();
   
    setCommentValue('');
    
    const signer = library?.getSigner();

    await createComment(profileId, pubId, data.contentURI, signer);
  }

  return (
    <div className='flex flex-col py-4'>
      <h4 className='text-xl font-bold mb-4'>Comments</h4>
      {comments?.data?.publications?.items?.map((comment:IComment)=><Comment {...comment}/>)}
      <div className="w-full pt-4 pb-4 flex">
          <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
                 <input style={{background:'transparent'}} value={commentValue} onChange={(e)=>setCommentValue(e.target.value)} type="text" className='outline-none w-full' placeholder='Comment'/>
          </div>
          <button onClick={commentHandler} className="flex items-center justify-center py-1 px-2">
                <img src="/assets/icons/send-icon.svg" alt="messages" />
           </button>
      </div>
    </div>

  )
}

export default Comments