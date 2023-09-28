import { Menu } from "@/models"

export function randomId (ids: Array<number>) {
  const min = 100000
  const max = 999999
  let newId = Math.floor(Math.random() * (max - min + 1)) + min
  do return newId
  while ( !ids.find((id: number) => id != newId))
}

export function localizeNumber(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n)
}