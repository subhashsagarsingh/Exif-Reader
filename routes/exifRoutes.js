const express = require("express");
const multer = require("multer");
const { extractExif, deleteExif, editExif } = require("../controllers/exifController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.post("/upload", upload.single("photo"), extractExif);
router.post("/remove-exif", upload.single("photo"), deleteExif);
router.post("/edit-exif", upload.single("photo"), editExif);

module.exports = router;
