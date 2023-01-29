import { PostImage } from '@entities/post'
import { Carousel } from '@mantine/carousel'
import type { IAddress } from '@shared/lib'

import { usePostCardContext } from '../model'

export function PostCardImage() {
  const { actions } = usePostCardContext()

  return (
    <div className="">
      {actions.length > 1 ? (
        <Carousel
          mx="auto"
          withControls
          withIndicators
          classNames={{
            control: 'bg-white',
            indicator: 'bg-white rounded-full w-2 h-2 z-50',
          }}
          styles={{
            control: {
              '&[data-inactive]': {
                opacity: 0,
                cursor: 'default',
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
