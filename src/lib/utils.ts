import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatePrice =(price:number) => {
const formater =  new Intl.NumberFormat("en-US",{
    style:"currency",
    currency:"USD"
  })
 return formater.format(price)
}
export const formateDate = (date:string) => {
  const formatedDate = new Date(date).toLocaleString()
  return formatedDate;
}