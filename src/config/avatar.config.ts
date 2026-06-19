export const getAvatarURL = (url: string) => {
  const storageURL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:9000";
  return `${storageURL}/${url}`;
};
