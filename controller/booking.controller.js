const Admin = require("../modals/Admin")
const Book = require("../modals/Book")
const { checkEmpty } = require("../utils/checkEmpty")
const sendEmail = require("../utils/email")


exports.booking = async (req, res) => {
    try {
        const { professionals, mobile, date, time, reason, address, name } = req.body
        const { isError, error } = checkEmpty({ professionals, mobile, date, time, reason, address, name })
        if (isError) {
            return res.status(400).json({ message: "All fields required", error })
        }
        const costomer = await Admin.findOne({ _id: req.user })
        // console.log(costomer, "DDDD");

        const professionalId = await Admin.findOne({ _id: professionals })
        await sendEmail({
            email: costomer.email,
            message: `Your Order Placed Successfully You Booked a ${professionalId.role} Its Name is ${professionalId.name} `,
            subject: "Your Booking Success"
        })
        await sendEmail({
            email: professionalId.email,
            message: `You how a new booking requset ${costomer.name}  is Book You`,
            subject: "You have a new server "
        })

        await Book.create({
            costomer: req.user, professionals, mobile, date, time, reason, address, name
        })
        res.status(200).json({ message: "Booking successfully !" })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Internal server error", error: err.message
        })
    }
}

exports.bookingHistory = async (req, res) => {
    try {
        const result = await Book.find({ professionals: req.user }).populate("professionals").populate("costomer");
        res.json({ message: 'Professional Booking Fetch Success', result });
        console.log(req.user);
        // console.log(result, "dddd");
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



