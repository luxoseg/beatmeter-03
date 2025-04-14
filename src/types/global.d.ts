declare global {
  interface ImportMeta {
    env: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
      [key: string]: string;
    };
  }

  interface ImportMeta {
    env: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
      [key: string]: string;
    };
  }

  interface Window {
    utmifyConfig?: {
      allowCors: boolean;
      pixelId: string;
    };
    utmify?: {
      redirect: (url: string) => void;
      event: (name: string, data?: any) => void;
    };
  }
}

export {};