import type { ILensMetadata } from '@type/metadata'
import { PublicationMainFocus, PublicationMetadataVersions } from '@type/metadata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Blob, NFTStorage } from 'nft.storage'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFFRERBMzZCZGExYjFlN2JkRDFjOGQxMmUxNzBlQ2M0RkI4QWFmNTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MDM3MzM4MjQ0OCwibmFtZSI6IlRlc3QifQ.jx5bcyDN5YevIV4WLAN_Qosn6A9JMoUVqALBVtRmNvI"
  const { comment, pubId } = JSON.parse(req.body)

  let contentURI = 'ipfs://'

  const commentMetadata: ILensMetadata = {
    name: `${pubId}comment`,
    version: PublicationMetadataVersions.one,
    metadata_id: uuidv4(),
    description: comment,
    content: comment,
    mainContentFocus: PublicationMainFocus.TEXT_ONLY,
    locale: 'en',
    attributes: [],
  }

  if (token) {
    const storage = new NFTStorage({ token })
    try {
      const blob = new Blob([JSON.stringify(commentMetadata, null, 2)], {
        type: 'application/json',
      })
      const cid = await storage.storeBlob(blob)

      contentURI += cid
      // @ts-ignore
      const status = await storage.status(cid)
      res.json({
        contentURI,
        status,
      })
    } catch {
      res.json({ message: 'errror' })
    }
  }
}
