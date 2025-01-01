const { adminRegister, adminLogin, adminLogout,
    professionalRegister, professionalLogout, registerAgencyAdmin,
    logoutAgencyAdmin, customerRegister, customerLogout,
    getAllProfessionals,
    getAllCostomers,
    getAllAgencyAdmin,
    getAllBakers,
    getAllElectritians,
    getAllMechanics,
    getAllCleaning,
    getAllDrivers,
    getAllPlumbers,
    agencyAdminprofessionalRegister,
    agencyAdminprofessionalLogout,
    getAgencyAdminProfessionals,
    getAdminProfile,
    updateAdminProfile,
    getAllagencyProfessionals,
    getAgencyProfile,
    customerProfiles,
    updateCustomerProfile } = require("../controller/admin.controller")
const { booking } = require("../controller/booking.controller")
const { adminProtected, agencyAdminProtected, CustomerProtected } = require("../middalware/protected")

const router = require("express").Router()



router
    // Admin 
    .post("/registeradmin", adminRegister)
    .post("/loginadmin", adminLogin)
    .post("/logoutadmin", adminLogout)
    .get("/getadminprofile", adminProtected, getAdminProfile)
    .put("/updateadminprofile/:id", adminProtected, updateAdminProfile)

    // AdminProfessional 
    .post("/professionalregister", adminProtected, professionalRegister)
    .post("/professionallogout", professionalLogout)
    .get("/getallprofessional", adminProtected, getAllProfessionals)
    .get("/getallagencyprofessional", agencyAdminProtected, getAllagencyProfessionals)

    // AgencyAdmin
    .get("/getallagencyadmin", getAllAgencyAdmin)
    .post("/agencyadminregister", registerAgencyAdmin)
    .post("/agencyadminlogout", logoutAgencyAdmin)

    // agency professional 
    .post("/registeragencyprofessional", agencyAdminProtected, professionalRegister)
    .post("/logoutagencyprofessional", professionalLogout)
    .get("/agencyprofile", agencyAdminProtected, getAgencyProfile)
    .post("/agencyprofessionalregister", agencyAdminProtected, agencyAdminprofessionalRegister)
    .post("/agencyprofessionallogout", agencyAdminprofessionalLogout)
    .get("/getagencyadminprofessional", adminProtected, getAgencyAdminProfessionals)

    // Customer 
    .post("/customerregister", customerRegister)
    .post("/customerlogout", customerLogout)
    .get("/costomerprofile", CustomerProtected, customerProfiles)
    .get("/getallcustomer", getAllCostomers)
    .put("/updatecustomerprofile/:id", CustomerProtected, updateCustomerProfile)

    // booking
    .post("/booking", CustomerProtected, booking)

    // * all *//
    .get("/getallbaker", getAllBakers)
    .get("/getallplumber", getAllPlumbers)
    .get("/getallelectritian", getAllElectritians)
    .get("/getallmechanic", getAllMechanics)
    .get("/getallcleaning", getAllCleaning)
    .get("/getalldriver", getAllDrivers)


module.exports = router