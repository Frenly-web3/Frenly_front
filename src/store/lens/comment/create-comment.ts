
import { lensHubContract, lensHubABI } from './../../../contract/lens-hub.contract';


import { signedTypeData, splitSignature } from '../post/create-post.utils';
import { ethers } from 'ethers';
import { createCommentTypedData } from './create-comment-typed-date';

export const createComment = async (profileId:string, pubId:string, contentURI:string, signer:any) => {
  // hard coded to make the code example clear
  const createCommentRequest = {
    profileId: profileId,
    publicationId: pubId,
    contentURI: contentURI,
    collectModule: {
      revertCollectModule: true
  },
  referenceModule: {
      followerOnlyReferenceModule: false
  }
  };
        
  const result = await createCommentTypedData(createCommentRequest);
  const typedData = result.data.createCommentTypedData.typedData;
  
  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(
  lensHubContract,
  lensHubABI,
  signer
)
  
  const tx = await lensHub.commentWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    referenceModuleData: typedData.value.referenceModuleData,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here: 
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
}