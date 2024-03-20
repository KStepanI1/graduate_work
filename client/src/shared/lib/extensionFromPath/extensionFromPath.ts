const extensionFromPath = (url: string) =>
  url?.split(".")?.reverse()?.[0] || url;

export default extensionFromPath;
