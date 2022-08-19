/* eslint-disable no-new */
/* eslint-disable no-plusplus */
import Compressor from "compressorjs";
import Resizer from "react-image-file-resizer";

export const fileExtensionToName = (ext: string) => {
  ext = ext.toLowerCase();
  if (
    ext.indexOf("jpg") !== -1 ||
    ext.indexOf("png") !== -1 ||
    ext.indexOf("jpeg") !== -1
  ) {
    return "Image_File";
  }
  if (ext.indexOf("mp3") !== -1 || ext.indexOf("wav") !== -1) {
    return "Audio_File";
  }
  if (
    ext.indexOf("mp4") !== -1 ||
    ext.indexOf("mov") !== -1 ||
    ext.indexOf("avi") !== -1
  ) {
    return "Video_File";
  }
  if (ext.indexOf("pdf") !== -1) {
    return "PDF_File";
  }
  if (ext.indexOf("doc") !== -1 || ext.indexOf("docx") !== -1) {
    return "Word_File";
  }
  if (ext.indexOf("xlsx") !== -1 || ext.indexOf("xlsm") !== -1) {
    return "Excel_File";
  }
  if (
    ext.indexOf("pptx") !== -1 ||
    ext.indexOf("ppt") !== -1 ||
    ext.indexOf("pptm") !== -1
  ) {
    return "PowerPoint_File";
  }
  if (ext.indexOf("txt") !== -1) {
    return "Text_File";
  }
  if (
    ext.indexOf("zip") !== -1 ||
    ext.indexOf("rar") !== -1 ||
    ext.indexOf("7zip") !== -1
  ) {
    return "Compressed_File";
  }

  return "File";
};
export const convertDateToMinutes = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const minutesOfHours = hours * 60;
  const allMinutes = minutesOfHours + minutes;
  return allMinutes;
};
export const convertMinutesToDate = (minutesNumber: number) => {
  const hours = minutesNumber / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return new Date(0, 0, 0, rhours, rminutes);
};
export const replaceDashes = (str: string) => str.replace(/\\/g, "/");

export const getGenderByGenderEnum = (gender: number): string => {
  if (gender === 0) return "Male";
  return "Female";
};

export const validateSize = (size: number, sizeLimitInMb: number) => {
  const fileSize = size / 1024 / 1024; // in MiB
  return sizeLimitInMb > fileSize;
};

export const addDaysForDate = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const compressImage = (
  file: any,
  maxWidth: number = 1000,
  maxHeight: number = 1000,
  compressFormat: string = "JPEG",
  quality: number = 100,
  rotation: number = 0
) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      (uri) => {
        resolve(uri);
      },
      "File"
    );
  });

export const convertDataURIToBlob = (dataURI: any) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export const compressImagesUsingCompressor = (file: any) => {
  new Compressor(file, {
    quality: 0.5,
    success: (compressedResult) => compressedResult,
  });
};
export const fileAfterCompress = (compressedFile: any) =>
  new File([compressedFile!], "image.jpeg", {
    type: compressedFile!.type,
  });

export const truncateString = (str: string, wantedLength: number) => {
  if (str.length > wantedLength) {
    return `${str.slice(0, wantedLength)}...`;
  }
  return str;
};

export const generateRandomId = () =>
  Date.now() + Math.floor(Math.random() * 1000);

export const getFileExtFromUrl = (url: string) =>
  url.slice(url.lastIndexOf("."));

export const removeItem = (arr: Array<any>, value: any): Array<any> => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const senetizeHtml = (html: string) => {
  if (typeof html !== "string") return html;
  return html.replace(/<[^>]+>|<\/[^>]+>|&.{3,6};/gm, "");
};

export const getConvientColorByPaymentStatus = (paymentStatus: number) => {
  switch (paymentStatus) {
    case 0:
      return "#21b721"; // Status: SUCCESS | Color: Green
    case 1:
      return "#e9a528"; // Status: PENDING | Color: orange
    case 2:
      return "#e73333"; // Status: FAILED | Color: Red
    default:
      return "";
  }
};

export const getRandomImageLink = () => "https://source.unsplash.com/random";
