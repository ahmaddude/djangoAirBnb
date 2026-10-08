export const API_HOST = (process.env.NEXT_PUBLIC_API_HOST ?? '').replace(/\/+$/, '');

export const WS_HOST = (process.env.NEXT_PUBLIC_WS_HOST ?? API_HOST.replace(/^http/, 'ws')).replace(/\/+$/, '');
