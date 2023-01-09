export const formatter = {
  cc(value: string) {
    return (
      value
        .replace(/\D+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) ?? ''
    )
  },
  ccthro(value: string) {
    return (
      value
        .replace(/\D+/g, '')
        .match(/.{1,2}/g)
        ?.join('/')
        .substring(0, 5) ?? ''
    )
  },
  cccvv(value: string) {
    return value.replace(/\D+/g, '').substring(0, 3)
  },
  tel(value: string) {
    const isPlus = value[0] === '+'
    console.log(isPlus)

    return value.replace(/\D+/g, '').replace(/^(\d{3})(\d{3})(\d+)$/, '+ ($1) $2-$3')
  },
}
