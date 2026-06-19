const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getStream(url: string): string {
  return `${API_URL}/v1/stream/${url}`;
}

export { getStream };
