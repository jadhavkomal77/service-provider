const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { checkEmpty } = require("../utils/checkEmpty")
const Admin = require("../modals/Admin")
const { Upload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")

//  Admin 

exports.adminRegister = async (req, res) => {
    try {
        const { email, password, mobile, name } = req.body;
        const { isError, error } = checkEmpty({ name, email, password });

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const isFound = await Admin.findOne({ email });
        if (isFound) {
            return res.status(409).json({ message: "Email Already Exist" });
        }

        const hash = await bcrypt.hash(password, 10);
        await Admin.create({ name, email, mobile, role: "admin", password: hash });

        res.json({ message: "Admin Register Success" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
// exports.adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const isFound = await Admin.findOne({ email })
//         if (!isFound) {
//             return res.status(401).json({ message: "Email Not Found" })
//         }
//         if (!isFound === isActive) {
//             return res.json({ message: "your account is deactivated" })
//         }
//         const isVerify = await bcrypt.compare(password, isFound.password)
//         if (!isVerify) {
//             return res.status(401).json({ message: "Password do Not Match" })
//         }
//         const Token = jwt.sign({ userId: isFound._id, name: isFound.name }, process.env.JWT_KEY)
//         if (isFound.role === "admin") {
//             res.cookie("admin", Token, { maxAge: 1000 * 60 * 60 * 24 })
//         } else if (isFound.role === "agencyadmin") {
//             res.cookie("agencyadmin", Token, { maxAge: 1000 * 60 * 60 * 24 })
//         } else if (isFound.role === "customer") {
//             res.cookie("customer", Token, { maxAge: 1000 * 60 * 60 * 24 })
//         } else if (isFound.role === "electritian" || "baker" || "plumber" || "mechanic" || "cleaning" || "driver") {
//             res.cookie("professsional", Token, { maxAge: 1000 * 60 * 60 * 24 })
//         }
//         res.json({
//             message: "Login Success", result: {
//                 _id: isFound._id,
//                 name: isFound.name,
//                 email: isFound.email,
//                 mobile: isFound.mobile,
//                 role: isFound.role
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const isFound = await Admin.findOne({ email });
        if (!isFound) {
            return res.status(401).json({ message: "Email not found" });
        }

        // Check if account is active
        if (!isFound.isActive) {
            return res.status(403).json({ message: "Your account is deactivated. Please contact support." });
        }

        // Verify password
        const isVerify = await bcrypt.compare(password, isFound.password);
        if (!isVerify) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: isFound._id, name: isFound.name },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
        );

        // Set cookie based on role
        let cookieName = 'user';
        if (isFound.role === 'admin') {
            cookieName = 'admin';
        } else if (isFound.role === 'agencyadmin') {
            cookieName = 'agencyadmin';
        } else if (isFound.role === 'customer') {
            cookieName = 'customer';
        } else if (['electrician', 'baker', 'plumber', 'mechanic', 'cleaning', 'driver'].includes(isFound.role)) {
            cookieName = 'professional';
        }

        res.cookie(cookieName, token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

        // Respond with success
        return res.json({
            message: "Login successful",
            result: {
                _id: isFound._id,
                name: isFound.name,
                email: isFound.email,
                mobile: isFound.mobile,
                role: isFound.role,
            },
        });
    } catch (error) {
        console.error("Error in adminLogin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



exports.adminLogout = async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
}
exports.getAdminProfile = async (req, res) => {
    try {
        const result = await Admin.findOne({ _id: req.user });
        res.json({ message: "admin Profile fetched success.", result });
        // console.log(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile.", error: error.message });
    }
}
exports.updateAdminProfile = async (req, res) => {
    try {
        Upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "multer error", error: err })
            }
            const { name, email, mobile } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile })
            if (isError) {
                return res.status(400).json({ message: "all fields require", error })
            }
            let hero = []
            console.log(req.file, 'DDD');

            if (req.file) {
                const { secure_url } = await cloudinary.uploadar.upload(req.file.path)
                console.log(secure_url);

                hero = secure_url
            }
            await Admin.findByIdAndUpdate(req.user, { name, email, mobile, hero })
            res.json({ message: "admin update success" })

        })
    } catch (error) {
        console.log(error);
        res.json({ message: "update admin profile success" })
    }

}
exports.getAllProfessionals = async (req, res) => {
    try {
        const result = await Admin.find({ adminId: req.user });
        const arr = [];

        for (let i = 0; i < result.length; i++) {
            if (
                result[i].role === "baker" ||
                result[i].role === "electritian" ||
                result[i].role === "plumber" ||
                result[i].role === "mechanic" ||
                result[i].role === "cleaning" ||
                result[i].role === "driver"
            ) {
                arr.push(result[i]);
            }
        }

        res.json({ message: "All Admin Professionals Fetch Success", result: arr });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.getAllagencyProfessionals = async (req, res) => {
    try {
        const result = await Admin.find({ agencyadminId: req.user });
        const arr = [];

        for (let i = 0; i < result.length; i++) {
            if (
                result[i].role === "baker" ||
                result[i].role === "electritian" ||
                result[i].role === "plumber" ||
                result[i].role === "mechanic" ||
                result[i].role === "cleaning" ||
                result[i].role === "driver"
            ) {
                arr.push(result[i]);
            }
        }

        res.json({ message: "All Admin Professionals Fetch Success", result: arr });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.professionalRegister = async (req, res) => {
    try {
        const { email, password, name, mobile, role } = req.body;
        const { isError, error } = checkEmpty({ name, email, password });

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        const isFound = await Admin.findOne({ email });
        if (isFound) {
            return res.status(409).json({ message: "Email Already Registered" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const hash = await bcrypt.hash(password, 10);
        await Admin.create({ name, email, password: hash, role, mobile, adminId: req.user });

        res.json({ message: "Professional Register Success" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.professionalLogout = async (req, res) => {
    res.clearCookie("professional")
    res.json({ message: "Professional LogOut Success" })
}

// Agency-Admin Register

exports.getAllAgencyAdmin = async (req, res) => {
    try {
        const result = await Admin.find({ role: "agencyadmin" });
        res.json({ message: "All Agencyadmin Fetch Success", result });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Agencyadmin", error });
    }
}
exports.getAgencyAdminProfessionals = async (req, res) => {
    try {
        const result = await Admin.find({ adminId: req.user });
        const arr = [];

        for (let i = 0; i < result.length; i++) {
            if (
                result[i].role === "baker" ||
                result[i].role === "electritian" ||
                result[i].role === "plumber" ||
                result[i].role === "mechanic" ||
                result[i].role === "cleaning" ||
                result[i].role === "driver"
            ) {
                arr.push(result[i]);
            }
        }

        res.json({ message: "All Agency Professionals Fetch Success", result: arr });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.getAgencyProfile = async (req, res) => {
    try {
        const result = await Admin.findOne({ _id: req.user });
        res.json({ message: "agency Profile fetched success.", result });
        // console.log(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile.", error: error.message });
    }
};
exports.registerAgencyAdmin = async (req, res) => {
    try {
        const { email, password, mobile, name, role } = req.body;
        const { isError, error } = checkEmpty({ name, email, password });

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const isFound = await Admin.findOne({ email });
        if (isFound) {
            return res.status(409).json({ message: "Email Already Exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        await Admin.create({ name, email, mobile, role, password: hash });

        res.json({ message: "AgencyAdmin Register Success" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.logoutAgencyAdmin = async (req, res) => {
    res.clearCookie("agencyadmin")
    res.json({ message: "AgencyAdmin LogOut Success" })
}

// agencyprofessional
exports.agencyAdminprofessionalRegister = async (req, res) => {
    try {
        const { email, password, name, mobile, role } = req.body;
        const { isError, error } = checkEmpty({ name, email, password });

        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }

        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const isFound = await Admin.findOne({ email });
        if (isFound) {
            return res.status(409).json({ message: "Email Already Registered" });
        }

        const hash = await bcrypt.hash(password, 10);

        await Admin.create({ name, email, password: hash, role, mobile, agencyadminId: req.user });

        res.json({ message: "AgencyAdmin Professional Register Success" });

    } catch (err) {

        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.agencyAdminprofessionalLogout = async (req, res) => {
    res.clearCookie("agencyadmin")
    res.json({ message: "agencyadmin Professional Logout Success" })
}

// Customer register

exports.getAllCostomers = async (req, res) => {
    try {
        const result = await Admin.find({ role: "customer" });
        res.json({ message: "All Customers Fetch Success", result });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
}
exports.customerRegister = async (req, res) => {
    try {
        const { email, password, mobile, name } = req.body;
        const { isError, error } = checkEmpty({ name, email, password });
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }
        const isFound = await Admin.findOne({ email });
        if (isFound) {
            return res.status(409).json({ message: "Email Already Exist" });
        }
        const hash = await bcrypt.hash(password, 10);

        await Admin.create({ name, email, mobile, password: hash });

        res.json({ message: "Customer Register Success" });

    } catch (err) {

        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
exports.customerLogout = async (req, res) => {
    res.clearCookie("customer")
    res.json({ message: "Customer Register Success" })
}
exports.customerProfiles = async (req, res) => {
    try {
        const result = await Admin.findOne({ _id: req.user });
        res.json({ message: "customer Profile fetched success.", result })
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile.", error: error.message });
    }
};
exports.updateCustomerProfile = async (req, res) => {
    try {
        Upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "multer error", error: err })
            }
            const { name, email, mobile, address, } = req.body
            const { isError, error } = checkEmpty({ name, email, mobile, address, })
            if (isError) {
                return res.status(400).json({ message: "All Fields require", error })
            }
            let hero
            if (req.files) {
                const { secure_url } = await cloudinary.uploader.upload(req.files.hero[0].path)
                hero = secure_url
            }
            await Admin.findByIdAndUpdate(req.user, { name, email, mobile, address, hero })
            res.json({ message: "customer update success" })
        })
    } catch (error) {
        console.log(error);
        res.json({ message: "customer profile update success" })
    }
}

// ***  //

exports.getAllBakers = async (req, res) => {
    const result = await Admin.find({ role: "baker" })
    res.json({ message: "All Baker Fetch Success", result })
}
exports.getAllPlumbers = async (req, res) => {
    const result = await Admin.find({ role: "plumber" })
    res.json({ message: "All Baker Fetch Success", result })
}
exports.getAllElectritians = async (req, res) => {
    const result = await Admin.find({ role: "electritian" })
    res.json({ message: "All Baker Fetch Success", result })
}
exports.getAllMechanics = async (req, res) => {
    const result = await Admin.find({ role: "mechanic" })
    res.json({ message: "All Baker Fetch Success", result })
}
exports.getAllCleaning = async (req, res) => {
    const result = await Admin.find({ role: "cleaning" })
    res.json({ message: "All Baker Fetch Success", result })
}
exports.getAllDrivers = async (req, res) => {
    const result = await Admin.find({ role: "driver" })
    res.json({ message: "All Baker Fetch Success", result })
}