const fs = require("fs");
const path = require("path");
const { ExifTool, exiftool } = require("exiftool-vendored");


//  Extract EXIF Metadata

exports.extractExif = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const metadata = await exiftool.read(req.file.path);
    fs.unlinkSync(req.file.path);

    res.json({ exifData: metadata });
  } catch (error) {
    console.error("EXIF error:", error.message);
    res.status(500).json({
      message: "Error extracting EXIF",
      error: error.message,
    });
  }
};


//  Remove All EXIF Metadata

exports.deleteExif = async (req, res) => {
  const tempExif = new ExifTool({ taskTimeoutMillis: 5000 });

  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const uploadPath = req.file.path;
    const cleanFileName = "cleaned_" + path.basename(uploadPath);
    const cleanFilePath = path.join(__dirname, "../uploads", cleanFileName);

    await tempExif.write(uploadPath, {}, ["-all="]);
    fs.renameSync(uploadPath, cleanFilePath);

    res.status(200).json({
      message: "EXIF data removed successfully!",
      fileUrl: `/uploads/${cleanFileName}`,
    });
  } catch (error) {
    console.error("Delete EXIF error:", error.message);
    res.status(500).json({
      message: "Error deleting EXIF",
      error: error.message,
    });
  } finally {
    await tempExif.end();
  }
};


// Edit EXIF Metadata

exports.editExif = async (req, res) => {
  const tempExif = new ExifTool({ taskTimeoutMillis: 5000 });

  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const updates = req.body.updates ? JSON.parse(req.body.updates) : {};

    const metadata = await tempExif.read(req.file.path);
    if (!metadata || Object.keys(metadata).length === 0) {
      return res.status(400).json({
        warning: "No EXIF metadata found in this image.",
        message: "This image does not contain any editable EXIF fields.",
      });
    }

    //  GPS formatting
    if (updates.GPSLatitude !== undefined && updates.GPSLongitude !== undefined) {
      updates.GPSLatitudeRef = updates.GPSLatitude >= 0 ? "N" : "S";
      updates.GPSLongitudeRef = updates.GPSLongitude >= 0 ? "E" : "W";
      updates.GPSLatitude = Math.abs(Number(updates.GPSLatitude));
      updates.GPSLongitude = Math.abs(Number(updates.GPSLongitude));
    }

    //  Ensure numeric fields
    ["FNumber", "FocalLength", "ISOSpeedRatings"].forEach((key) => {
      if (updates[key] !== undefined) updates[key] = Number(updates[key]);
    });

    // Safe DateTimeOriginal formatting
    if (updates.DateTimeOriginal) {
      let dt = updates.DateTimeOriginal;

      try {
        if (dt instanceof Date) {
          dt = dt.toISOString();
        } else if (typeof dt === "number") {
          dt = new Date(dt).toISOString();
        } else if (typeof dt !== "string") {
          dt = String(dt);
        }

        // Normalize ISO or common formats → "YYYY:MM:DD HH:MM:SS"
        dt = dt.replace("T", " ").replace("Z", "");
        dt = dt.replace(/-/g, ":");

        // Trim milliseconds if present
        if (dt.includes(".")) dt = dt.split(".")[0];

        updates.DateTimeOriginal = dt;
      } catch (err) {
        console.warn(" Invalid DateTimeOriginal format:", dt);
        delete updates.DateTimeOriginal; 
      }
    }

    //  Filter writable fields
    const safeUpdates = {};
    for (const [key, value] of Object.entries(updates)) {
      if (
        value !== null &&
        value !== undefined &&
        (typeof value === "string" || typeof value === "number")
      ) {
        safeUpdates[key] = value;
      }
    }

    // Remove empty values
    for (const key in safeUpdates) {
      const v = safeUpdates[key];
      if (
        v === null ||
        v === undefined ||
        v === "" ||
        (typeof v === "number" && isNaN(v))
      ) {
        delete safeUpdates[key];
      }
    }

    // Prepare output file
    const outputFileName = `edited_${req.file.originalname}`;
    const outputPath = path.join(__dirname, "../uploads", outputFileName);

    await tempExif.write(req.file.path, safeUpdates, ["-overwrite_original"]);
    fs.renameSync(req.file.path, outputPath);

    res.status(200).json({
      message: "EXIF updated successfully",
      fileUrl: `/uploads/${outputFileName}`,
    });
  } catch (err) {
    console.error("Edit EXIF error:", err);
    res.status(500).json({ message: "Error editing EXIF", error: err.message });
  } finally {
    await tempExif.end();
  }
};


// Download Clean Image

exports.downloadCleanImage = async (req, res) => {
  const tempExif = new ExifTool({ taskTimeoutMillis: 5000 });
  try {
    if (!req.query.file)
      return res.status(400).json({ message: "No file specified" });

    const filePath = path.join(__dirname, "../uploads", req.query.file);
    if (!fs.existsSync(filePath))
      return res.status(404).json({ message: "File not found" });

    const cleanFileName = `clean_${req.query.file}`;
    const cleanFilePath = path.join(__dirname, "../uploads", cleanFileName);

    await tempExif.write(filePath, {}, ["-all=", `-o`, cleanFilePath, "-overwrite_original"]);

    res.status(200).json({ fileUrl: `/uploads/${cleanFileName}` });
  } catch (err) {
    console.error("Clean image error:", err);
    res.status(500).json({ message: "Error generating clean image", error: err.message });
  } finally {
    await tempExif.end();
  }
};


//  Cleanup on Shutdown

process.on("exit", async () => {
  try {
    await exiftool.end();
    console.log("Shared ExifTool instance closed");
  } catch {}
});
