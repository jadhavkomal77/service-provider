const multer = require("multer")
const path = require("path")

const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
// const upload = multer({ storage: Storage }).single("images")

const Upload = multer({ storage: Storage }).fields([
    { name: "hero", maxCount: 1 },

])
module.exports = { Upload }

