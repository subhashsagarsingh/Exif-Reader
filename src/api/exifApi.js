import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_EXIF_URL,
});

//  Upload image and extract EXIF metadata
export const uploadPhoto = (formData) =>
  API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

//  Remove EXIF metadata from an uploaded image
export const removeExif = (formData) =>
  API.post("/remove-exif", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

//  (Optional) Edit EXIF metadata fields
export const editExif = (formData) =>
  API.post("/edit-exif", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
