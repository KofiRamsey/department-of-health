import { NextRequest } from 'next/server';

declare module 'next/dist/server/web/exports' {
  interface RouteHandlerContext {
    params: Record<string, string | string[]>;
  }
}

declare module 'next/server' {
  export interface RouteHandlerContext {
    params: Record<string, string | string[]>;
  }
} 