export const formatter = {
  cc(value: string) {
    return (
      value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) ?? ''
    )
  },
  tel(value: string) {
    return value.replace(/^(\d{3})(\d{3})(\d+)$/, '($1) $2-$3')
  },
}
