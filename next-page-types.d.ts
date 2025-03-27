import type { ReactNode } from 'react';

declare global {
  namespace App {
    interface PageProps {
      params: Record<string, string>;
      searchParams?: Record<string, string | string[] | undefined>;
      children?: ReactNode;
    }
  }
}

export {}; 