import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Clock, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ExifEditorModal from "../components/ExifEditorModal";
import UploadSection from "../components/UploadSection";
import { editExifData } from "../utils/exifHandlers";

const cardData = [
  { icon: <Camera className="w-8 h-8 text-blue-600" />, title: "Camera Info", desc: "Lens, ISO, Model." },
  { icon: <MapPin className="w-8 h-8 text-green-600" />, title: "Location Data", desc: "GPS coordinates." },
  { icon: <Clock className="w-8 h-8 text-yellow-600" />, title: "Timestamp", desc: "Photo date & time." },
  { icon: <Info className="w-8 h-8 text-purple-600" />, title: "Metadata Summary", desc: "All EXIF details." },
];

const EXIF_FIELDS = [
  "Make",
  "Model",
  "ExposureTime",
  "FNumber",
  "ISOSpeedRatings",
  "FocalLength",
  "Artist",
  "Copyright",
  "ImageDescription",
  "DateTimeOriginal",
  "GPSLatitude",
  "GPSLongitude",
];

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cleanFileUrl, setCleanFileUrl] = useState(null);




  // Prepare initialValues for modal dynamically
  const modalInitialValues = React.useMemo(() => {
    if (!exifData) return {};
    const values = {};
    EXIF_FIELDS.forEach((key) => {
      values[key] = exifData[key] || "";
    });
    return values;
  }, [exifData]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* <Navbar /> */}

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-28 flex flex-col items-center w-full px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-xl text-center mb-6 sm:mb-8">
          <motion.h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-2">
            Meta<span className="text-blue-600">Lens!</span>
          </motion.h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Upload your photos to extract, view, edit, or remove EXIF metadata.  
            If your image contains GPS information, you can also see the location on the map!
          </p>
        </div>

        {/* Info Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl w-full mb-12 sm:mb-16">
          {cardData.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCard(selectedCard === card.title ? null : card.title)}
              className={`cursor-pointer ${selectedCard === card.title ? "bg-blue-100 rounded-2xl" : ""}`}
            >
              <Card {...card} />
            </motion.div>
          ))}
        </motion.div>

        {/* Upload + Preview Section */}
        <div className="w-full flex flex-col items-center">
          <UploadSection
            file={file}
            setFile={setFile}
            exifData={exifData}
            setExifData={setExifData}
            loading={loading}
            setLoading={setLoading}
            selectedCard={selectedCard}
            setShowEditModal={setShowEditModal}
            cleanFileUrl={cleanFileUrl}
            setCleanFileUrl={setCleanFileUrl}
          />
        </div>
      </main>

      <Footer />

      {/* EXIF Editor Modal */}
      <ExifEditorModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={(updates) =>
          editExifData(file, updates, setShowEditModal, setCleanFileUrl, setExifData)
        }
        initialValues={modalInitialValues} 

        // warning={!exifData || Object.keys(exifData).length === 0 ? { message: "No EXIF metadata found." } : null}
      />

     

    </div>
  );
};

export default HomePage;
