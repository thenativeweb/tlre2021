export interface HppConfig {
  apiHost: string;
}

declare global {
  interface Window {
    hppConfig?: HppConfig;
  }
}
