import jsPDF from "jspdf";
import toast from "react-hot-toast";

export const downloadCleanImage = async (file, cleanFileUrl) => {
  if (!cleanFileUrl) {
    toast.error("No clean image available to download!");
    return;
  }

  try {
    const response = await fetch(cleanFileUrl);
    if (!response.ok) throw new Error("Failed to download clean image");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file?.name || "clean-image.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();

    toast.success("Clean image downloaded successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to download clean image!");
  }
};

export const downloadExifPDF = (exifData, file, selectedCard, filterExifData) => {
  if (!exifData) {
    toast.error("No EXIF data available!");
    return;
  }

  try {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("EXIF Data Report", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const dataToExport = selectedCard
      ? filterExifData(exifData, selectedCard)
      : exifData;

    Object.entries(dataToExport).forEach(([key, value]) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${key}: ${String(value)}`, 20, y);
      y += 8;
    });

    const fileName = file ? file.name.replace(/\.[^/.]+$/, "") : "exif-data";
    doc.save(`${fileName}-report.pdf`);

    toast.success("EXIF report PDF downloaded!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to generate EXIF PDF!");
  }
};

export const filterExifData = (data, category) => {
  switch (category) {
    case "Camera Info":
      return {
        Model: data.Model,
        LensModel: data.LensModel,
        ISO: data.ISO,
        FNumber: data.FNumber,
        ExposureTime: data.ExposureTime,
      };

    case "Location Data":
      return {
        GPSLatitude: data.GPSLatitude,
        GPSLongitude: data.GPSLongitude,
        GPSAltitude: data.GPSAltitude,
      };

    case "Timestamp":
      return {
        DateTimeOriginal: data.DateTimeOriginal,
        ModifyDate: data.ModifyDate,
      };

    case "Metadata Summary":
      return data;

    default:
      return data;
  }
};
