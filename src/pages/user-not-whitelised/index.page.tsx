import { Button, Meta } from '@shared/ui'
import { useRouter } from 'next/router'

export default function UserNotWhitelistedPage() {
  const router = useRouter()

  return (
    <>
      <Meta title="Frenly" description="Not whitelisted" />
      <div className="container flex flex-col items-center h-screen">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/assets/images/eyes.gif" alt="eyes" className="w-20 h-20" />
          <h1 className="text-4xl font-bold mt-16">Frenly</h1>
          <h2 className="text-base text-center mt-3 text-gray">
            Woops, your address in not whitelisted for alpha test. Gain access to the
            closed alpha filling the form below.
          </h2>
        </div>

        <div className="w-full py-4 mb-16">
          <a href="https://1ltwty44asn.typeform.com/to/DQ8hHy11" className="w-full">
            <Button>Open Form</Button>
          </a>
          <div className="mt-2"></div>
          <Button onClick={() => router.push(`/auth`)}>Back to Auth</Button>
        </div>
      </div>
    </>
  )
}
