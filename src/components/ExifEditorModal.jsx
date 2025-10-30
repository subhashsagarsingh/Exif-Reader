import React, { useState, useEffect, useCallback } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExifEditorModal = ({ show, onClose, onSave, initialValues, warning }) => {
  const [form, setForm] = useState({});
  const [isEditable, setIsEditable] = useState(true);
  const [warningMsg, setWarningMsg] = useState("");

  // Toast visibility
  const [showToast, setShowToast] = useState(false);

  // Handle warnings or initial EXIF data
  useEffect(() => {
    if (warning) {
      setIsEditable(false);
      setWarningMsg(
        warning.message ||
          "EXIF editing not supported for this file type. Only JPEG and TIFF files support metadata editing."
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 8000);
      return;
    }

    if (initialValues && Object.keys(initialValues).length > 0) {
      setForm(initialValues);
      setIsEditable(true);
    } else {
      setForm({});
    }
  }, [initialValues, warning]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (show) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, handleKeyDown]);

  if (!show) return null;

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = { ...form };

    ["GPSLatitude", "GPSLongitude", "FNumber", "FocalLength", "ISOSpeedRatings"].forEach((key) => {
      if (updates[key] !== undefined && updates[key] !== "") {
        updates[key] = isNaN(updates[key]) ? updates[key] : parseFloat(updates[key]);
      }
    });

    onSave(updates);
  };

  const sections = [
    { title: "Camera Info", fields: ["Make", "Model", "ExposureTime", "FNumber", "ISOSpeedRatings", "FocalLength"] },
    { title: "Image Info", fields: ["Artist", "Copyright", "ImageDescription", "DateTimeOriginal"] },
    { title: "Location", fields: ["GPSLatitude", "GPSLongitude"] },
  ];

  const renderFields = (fields) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((key) => {
        let type = "text";
        if (key === "DateTimeOriginal") type = "datetime-local";
        if (["GPSLatitude", "GPSLongitude", "FNumber", "FocalLength", "ISOSpeedRatings"].includes(key)) type = "number";

        return (
          <div className="flex flex-col" key={key}>
            <label className="text-gray-600 text-sm mb-1">{key}</label>
            <input
              type={type}
              step={type === "number" ? "any" : undefined}
              placeholder={key}
              value={form[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                isEditable ? "focus:ring-blue-500" : "bg-gray-100 cursor-not-allowed"
              } transition`}
              disabled={!isEditable}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Toast Warning (top center) */}
          <AnimatePresence>
            {showToast && warningMsg && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 z-[9999]"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-700" />
                <span className="text-sm font-medium">{warningMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 flex flex-col max-h-full overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Edit EXIF Metadata</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Inline Warning */}
              {warningMsg && (
                <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4 text-yellow-800">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{warningMsg}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {sections.map((section) => (
                  <div key={section.title} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-700 mb-2">{section.title}</h3>
                    {renderFields(section.fields)}
                  </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3 flex-wrap">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition"
                  >
                    Close
                  </button>

                  {isEditable && (
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExifEditorModal;
