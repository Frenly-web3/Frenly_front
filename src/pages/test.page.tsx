import { PostCarousel } from '@shared/ui/post-carousel'

const TestPage = () => {
  const content = [
    'https://unsplash.com/photos/svS3TN4UHU8/download?ixid=MnwxMjA3fDB8MXxhbGx8OHx8fHx8fDJ8fDE2NzMxOTU0MjI&force=true&w=640',
    'https://unsplash.com/photos/nc11Hg2ja-s/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjczMTg1NzI0&force=true&w=640',
    'https://unsplash.com/photos/rQsYZnCRU00/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjczMTg1MDE4&force=true&w=640',
    'https://unsplash.com/photos/FFqNATH27EM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjczMTg1Nzk2&force=true&w=640',
  ]

  return (
    <div className={`mx-auto max-w-[640px]`}>
      <PostCarousel images={content} />
    </div>
  )
}

export default TestPage
