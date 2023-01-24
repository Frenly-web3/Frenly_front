import React from 'react'

const secret = '12ibu3r'

export default function WL() {
  const whitelist = process.env.NEXT_PUBLIC_WHITELIST
  const [pass, setPass] = React.useState('')
  if (pass === secret)
    return (
      <>
        <button
          onClick={() => setPass('')}
          className="px-3 rounded-full py-1 bg-overlay-1-solid hover:bg-overlay-2-solid"
        >
          reset
        </button>
        <p>{whitelist || 'no whitelist'}</p>
      </>
    )

  return (
    <>
      <input
        type="text"
        className="bg-overlay-1-solid"
        onChange={(e) => setPass(e.target.value)}
      />
    </>
  )
}
