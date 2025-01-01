const Admin = require("../modals/Admin");
const Book = require("../modals/Book");
const { checkEmpty } = require("../utils/checkEmpty")
const { Upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")


exports.getProfesstionalprofilelogin = async (req, res) => {
    try {
        const result = await Admin.findOne({ _id: req.user });
        res.json({ message: "Professional Profile fetched success.", result });
        console.log(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile.", error: error.message });
    }
};

exports.getProfesstionalpro = async (req, res) => {
    try {
        const result = await Admin.findById(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Profile not found." });
        }
        res.json({ message: "Professional Profile fetched successfully.", result });
        console.log(req.params.id);
        console.log(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile.", error: error.message });
    }
};

exports.updateProfesstionalProfiles = async (req, res) => {
    try {
        Upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "multer error", error: err })
            }
            const { name, email, mobile, address, price, available, } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile, address, price, available, })
            if (isError) {
                return res.status(400).json({ message: "All Fields require", error })
            }
            let hero
            if (req.files) {
                const { secure_url } = await cloudinary.uploader.upload(req.files.hero[0].path)
                hero = secure_url
            }
            await Admin.findByIdAndUpdate(req.user, { name, email, mobile, address, price, available, hero })
            res.json({ message: "professional update success" })
        })
    } catch (error) {
        console.log(error);
        res.json({ message: "professional profile update success" })
    }
}


// active or de-active adminpro
exports.activateAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const Adminpro = await Admin.findByIdAndUpdate(id, { isActive: true });
        res.json({ message: "Admin activated", Adminpro });
    } catch (error) {
        res.status(500).json({ message: "Error activating Admin", error: error.message });
    }
};
exports.deactivateAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const Adminpro = await Admin.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: "Admin De-Activate", Adminpro });
    } catch (error) {
        res.status(500).json({ message: "Error De-Activate Admin", error: error.message });
    }
};

// active or de-active  agencypro
exports.activateAgencyAdmin = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    try {
        const AgencyAdmin = await Admin.findByIdAndUpdate(id, { isActive: true });
        res.json({ message: "AgencyAdmin activated", AgencyAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error activating AgencyAdmin", error: error.message });
    }
};
exports.deactivateAgencyAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const AgencyAdmin = await Admin.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: "AgencyAdmin De-Activate", AgencyAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error De-Activate AgencyAdmin", error: error.message });
    }
};

// accept
exports.acceptProfessional = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const { isAccept } = req.body
        await Book.findByIdAndUpdate(id, { isAccept: true });
        res.json({ message: "professional Accept success" });
        // console.log(isAccept);

    } catch (error) {
        res.status(500).json({ message: "server Error ", error: error.message });
    }
};
// exports.acceptProfessional = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { isAccept } = req.body;

//         if (!["accept", "reject", "pending"].includes(isAccept)) {
//             return res.status(400).json({ message: "Invalid isAccept value" });
//         }
//         await Book.findByIdAndUpdate(id, { isAccept });

//         res.json({ message: "Professional status updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

