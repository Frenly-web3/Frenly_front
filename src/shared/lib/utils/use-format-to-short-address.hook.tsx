export const useFormatToShortAddress = () => ({
  formatToShortAddress: ({ address }: { address: string }) => {
    return `${address.slice(0, 5)}...${address.slice(38, 43)}`
  },
})
