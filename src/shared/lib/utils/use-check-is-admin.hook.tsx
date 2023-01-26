export const useCheckIsAdmin = ({ address }: { address: string }) => {
  return address == process.env.NEXT_PUBLIC_ADMIN_ADDRESS
}
