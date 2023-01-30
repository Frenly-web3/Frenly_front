import { PostImage } from '@entities/post'
import { Carousel } from '@mantine/carousel'
import type { IAddress } from '@shared/lib'
import { useState } from 'react'

import { usePostCardContext } from '../model'

export function PostCardImage() {
  const { actions } = usePostCardContext()

  const [chosedImage, setChosedImage] = useState(0)

  return (
    <div className="">
      {actions.length > 1 ? (
        <Carousel
          onSlideChange={(index) => setChosedImage(index)}
          withControls
          dragFree={false}
          draggable={false}
          classNames={{
            control: 'bg-white',
          }}
          styles={{
            control: {
              backgroundColor: 'rgba(0,0,0,0)',
              '&[data-inactive]': {
                opacity: 0,
                cursor: 'pointer',
              },
            },
          }}
        >
          {actions.map((action, index) => {
            return (
              <Carousel.Slide key={index}>
                <PostImage
                  image={{
                    type: 'image',
                    url: `${process.env.NEXT_PUBLIC_API_URL}token-images/${action.image}`,
                  }}
                  chosedImage={chosedImage}
                  imagesCount={actions.length}
                  address={action.contractAddress as IAddress}
                />
              </Carousel.Slide>
            )
          })}
        </Carousel>
      ) : (
        <PostImage
          image={{
            type: 'image',
            url: `${process.env.NEXT_PUBLIC_API_URL}token-images/${actions[0]?.image}`,
          }}
          address={actions[0]?.contractAddress as IAddress}
        />
      )}
    </div>
  )
}
