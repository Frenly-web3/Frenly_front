import Carousel from 'nuka-carousel'

interface IProperties {
  images: string[]
}

export const PostCarousel = (props: IProperties) => {
  const { images } = props

  if (images.length < 2)
    return (
      <>
        <style jsx>{`
          .img-bg-0 {
            position: relative;
            overflow: hidden;
          }

          .img-bg-0:before {
            content: '';
            position: absolute;
            inset: -5rem;
            background: url(${images[0]});
            background-position: center center;
            z-index: -1;
          }
        `}</style>
        <div className={`max-h-[420px] flex items-center justify-center img-bg-0`}>
          <img src={images[0]} alt="Image" className={`max-h-[420px]`} />
        </div>
      </>
    )

  return (
    <Carousel
      adaptiveHeight
      renderTopRightControls={({ currentSlide, slideCount }) => (
        <div
          className={`mt-4 mr-4 px-3 rounded-full bg-[#00000066] h-8 flex items-center justify-center text-white backdrop-blur-[1rem]`}
        >
          {currentSlide + 1}/{slideCount}
        </div>
      )}
      renderBottomCenterControls={() => <></>}
      renderCenterLeftControls={() => <></>}
      renderCenterRightControls={() => <></>}
      speed={200}
    >
      {images.map((image) => {
        return (
          <>
            <div
              className={`max-h-[420px] flex items-center justify-center bg-overlay-1-solid`}
            >
              <img src={image} alt="Image" className={`max-h-[420px]`} />
            </div>
          </>
        )
      })}
    </Carousel>
  )
}
