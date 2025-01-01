const jwt = require("jsonwebtoken")

// Admin Protected

exports.adminProtected = async (req, res, next) => {
    const { admin } = req.cookies
    if (!admin) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}

// professsional Protected

exports.professionalProtected = async (req, res, next) => {
    const { professsional } = req.cookies
    if (!professsional) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(professsional, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}

// Agency Protected

exports.agencyAdminProtected = async (req, res, next) => {
    const { agencyadmin } = req.cookies
    if (!agencyadmin) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(agencyadmin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}

// Customer
exports.CustomerProtected = async (req, res, next) => {
    const { customer } = req.cookies
    if (!customer) {
        return res.status(401).json({ message: "Cookie Not Found" })
    }
    jwt.verify(customer, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error);
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
    })
    next()
}
