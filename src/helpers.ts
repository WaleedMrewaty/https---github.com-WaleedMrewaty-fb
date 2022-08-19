/* eslint-disable import/prefer-default-export */
export const truncateString = (str: string, wantedLength: number) => {
  if (str.length > wantedLength) {
    return `${str.slice(0, wantedLength)}...`;
  }
  return str;
};

export const generateYoutubeIFrameLink = (youtubeLink: string) => {
  if (!youtubeLink) return undefined;

  if (youtubeLink.includes("?v")) {
    return `https://www.youtube.com/embed/${new URLSearchParams(
      new URL(youtubeLink).search
    ).get("v")}`;
  }
  if (youtubeLink.includes("embed")) return youtubeLink;

  if (youtubeLink.includes("youtu.be")) {
    const vidId = youtubeLink.slice(youtubeLink.lastIndexOf("/"));
    return `https://www.youtube.com/embed/${vidId}`;
  }

  return "";
};
export const getRandomImageLink = () => "https://source.unsplash.com/random";

export const senetizeHtml = (html: string) => {
  if (typeof html !== "string") return html;
  return html.replace(/<[^>]+>|<\/[^>]+>|&.{3,6};/gm, "");
};

export const getYoutubeLinkThumbnail = (youtubeLink: string | null) => {
  if (!youtubeLink || !youtubeLink.includes("?v")) return "";
  const id = new URLSearchParams(new URL(youtubeLink).search).get("v");
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

export const generateFriendlyUrlFromId = (string: string, id: number) =>
  `${string.replace(/[/%<}|>^{`. ]/g, "-")}-${id}`;

export const getIdFromFriendlyUrl = (query: any) => {
  if (typeof query !== "string") return 0;

  return Number(query.slice(query.lastIndexOf("-") + 1));
};

export const removeLineBreaksFromString = (string: string) =>
  string.replace(/[\r\n]/gm, "");

export const forwardMessageToWhatsApp = (
  phoneNumber: string,
  message = "Hello !"
) =>
  window.open(
    `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&app_absent=0`
  );

export const saveToLocalStorage = (key: string, value: any) => {
  typeof window !== "undefined" &&
    localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key: string) => {
  const data = typeof window !== "undefined" && localStorage.getItem(key);
  if (!data) return null;

  return JSON.parse(data);
};
