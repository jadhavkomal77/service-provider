const { bookingHistory } = require("../controller/booking.controller")
const { updateProfesstionalProfiles, getProfesstionalProfiles, activateAdmin, activateAgencyAdmin, deactivateAgencyAdmin, deactivateAdmin, getProfesstionalpro, getProfesstionalprofilelogin, acceptProfessional } = require("../controller/Professtional.controller")
const { professionalProtected, adminProtected } = require("../middalware/protected")

const router = require("express").Router()

router

    .get("/getprofessionalprofilelogin", professionalProtected, getProfesstionalprofilelogin)

    .get("/getprofessionalprofile/:id", getProfesstionalpro)
    .put("/updateprofessionalprofile/:id", professionalProtected, updateProfesstionalProfiles)

    .put("/activeadmin/:id", adminProtected, activateAdmin)
    .put("/de-activeadmin/:id", adminProtected, deactivateAdmin)

    .put("/activeagencys/:id", activateAgencyAdmin)
    .put("/de-activeagencys/:id", deactivateAgencyAdmin)
    .put("/accept/:id", acceptProfessional)

    .get("/bookinghistory", professionalProtected, bookingHistory)


module.exports = router