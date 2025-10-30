import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Download, Edit, Trash } from "lucide-react";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import ExifViewer from "./ExifViewer";
import { downloadCleanImage, downloadExifPDF, filterExifData } from "../utils/exifUtils";
import { uploadFile, removeExifData } from "../utils/exifHandlers";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UploadSection = ({
  file,
  setFile,
  exifData,
  setExifData,
  loading,
  setLoading,
  selectedCard,
  setShowEditModal,
  cleanFileUrl,
  setCleanFileUrl,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Require login before certain actions
  const requireLogin = (action) => {
    if (!user) {
      toast.error("Please login or sign up to use this feature.");
      setTimeout(() => navigate("/signin"), 1200);
      return false;
    }
    return true;
  };

  // Left-side buttons (only protected ones)
  const leftButtons = [
    exifData && {
      onClick: () =>
        requireLogin() && downloadExifPDF(exifData, file, selectedCard, filterExifData),
      icon: <Download size={16} />,
      label: "Download PDF",
      className: "border border-green-500 bg-green-50 hover:bg-green-100",
    },
    file && {
      onClick: () =>
        requireLogin() && removeExifData(file, setLoading, setExifData, setCleanFileUrl),
      icon: <Trash size={18} />,
      label: "Remove EXIF",
      className: "border-red-500 bg-red-50 hover:bg-red-100",
    },
    file && {
      onClick: () => requireLogin() && setShowEditModal(true),
      icon: <Edit size={16} />,
      label: "Edit EXIF",
      className: "border border-blue-500 bg-blue-50 hover:bg-blue-100",
    },
  ].filter(Boolean);

  return (
    <motion.div
      className={`bg-white shadow rounded-3xl p-10 border border-gray-200 transition-all duration-500
        ${exifData ? "max-w-6xl" : "max-w-5xl"} w-full mb-28 flex flex-col lg:flex-row gap-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT: Upload + EXIF Info */}
      <div className="flex-1 flex flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadFile(file, setExifData, setLoading, setCleanFileUrl);
          }}
          className="space-y-4"
        >
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <span className="text-gray-600 text-center">
              {file ? (
                <span className="font-medium text-blue-700">{file.name}</span>
              ) : (
                "Click or drag & drop a photo here"
              )}
            </span>
          </label>

          {/* Upload button — public (no login needed) */}
          <Button
            type="submit"
            disabled={!file || loading}
            className="border border-blue-500 bg-blue-50 hover:bg-blue-100 w-full"
          >
            {loading ? "Processing..." : "Upload & Extract"}
          </Button>
        </form>

        {exifData && (
          <div className="mt-6">
            <ExifViewer
              data={
                selectedCard ? filterExifData(exifData, selectedCard) : exifData
              }
            />
          </div>
        )}

        {/* Protected buttons (PDF / Remove / Edit) */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {leftButtons.map((btn, idx) => (
            <IconButton
              key={idx}
              onClick={btn.onClick}
              icon={btn.icon}
              className={`px-3 py-1.5 text-sm rounded-md ${btn.className}`}
            >
              {btn.label}
            </IconButton>
          ))}
        </div>
      </div>

      {/* RIGHT: Image Preview + Protected Download */}
      {file && (
        <motion.div
          className="flex-1 flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative bg-gray-50 p-3 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all max-w-md w-full">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded preview"
              className="w-full rounded-xl object-contain max-h-96 mx-auto"
            />
            <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 text-xs text-gray-700 rounded-md shadow-sm">
              Preview
            </div>
          </div>

          {/* Protected download button */}
          {cleanFileUrl && (
            <IconButton
              onClick={() =>
                requireLogin() && downloadCleanImage(file, cleanFileUrl)
              }
              icon={<Download size={16} />}
              className="border border-green-500 bg-green-50 hover:text-white hover:bg-green-500 px-3 py-1.5 mt-3 text-sm rounded-md"
            >
              Download Clean Image
            </IconButton>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadSection;
