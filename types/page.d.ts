import { NextPage } from 'next'
import { ReactNode } from 'react'

declare module 'next' {
  export type PageProps<P = {}, IP = P> = {
    params: P
    searchParams?: Record<string, string | string[] | undefined>
  }

  export type NextPage<P = {}, IP = P> = NextPage<P, IP>
} 