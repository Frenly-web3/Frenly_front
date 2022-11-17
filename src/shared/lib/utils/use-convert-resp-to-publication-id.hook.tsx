export const useConvertResponseToPublicationId = () => {
  return ({ tx }: { tx: any }) => {
    return Number(tx?.logs[0]?.topics[2]).toString(16).length === 1
      ? `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x0${Number(
          tx?.logs[0]?.topics[2]
        ).toString(16)}`
      : `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x${Number(
          tx?.logs[0]?.topics[2]
        ).toString(16)}`
  }
}
