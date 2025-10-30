import { uploadPhoto, removeExif, editExif } from "../api/exifApi";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file, setExifData, setLoading, setCleanFileUrl) => {
  if (!file) {
    toast.error("Please upload a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {
    setLoading(true);
    setExifData(null);
    const { data } = await uploadPhoto(formData);
    setExifData(data.exifData);
    setCleanFileUrl(null);
    toast.success("File uploaded successfully!");
  } catch (err) {
    console.error(err);
    setExifData(null);
    toast.error("Error uploading file!");
  } finally {
    setLoading(false);
  }
};

export const removeExifData = async (file, setLoading, setExifData, setCleanFileUrl) => {
  if (!file) {
    toast.error("Please upload a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {
    setLoading(true);
    const { data } = await removeExif(formData);
    toast.success(data.message || "EXIF data removed!");
    setExifData(null);
    setCleanFileUrl(`${BASE_URL}${data.fileUrl}`);
  } catch (err) {
    console.error(err);
    toast.error("Error removing EXIF data!");
  } finally {
    setLoading(false);
  }
};

export const editExifData = async (file, updates, setShowEditModal, setCleanFileUrl, setExifData) => {
  if (!file) {
    toast.error("Please upload a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("updates", JSON.stringify(updates));

  try {
    const { data } = await editExif(formData);
    toast.success(data.message || "EXIF data updated!");
    setShowEditModal(false);
    setCleanFileUrl(`${BASE_URL}${data.fileUrl}`);

    setExifData((prev) => ({
      ...prev,
      Artist: updates.Artist,
      Copyright: updates.Copyright,
    }));
  } catch (err) {
    console.error(err);
    toast.error("Error editing EXIF data!");
  }
};
