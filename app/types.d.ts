declare namespace JSX {
  interface IntrinsicElements {
    [key: string]: any
  }
}

declare module 'next' {
  export interface PageConfig {
    amp?: boolean
  }
}

// Next.js page type
declare module 'next/page' {
  export interface PageProps {
    params: Record<string, string>
    searchParams?: Record<string, string | string[] | undefined>
  }
} 