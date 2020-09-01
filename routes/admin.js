const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);

router.use(auth); // jadi klo mau ke dashboard harus melawati "auth" dlu

router.get("/logout", adminController.actionLogout);

router.get("/dashboard", adminController.viewDashboard);

/* end-point Category */
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);

// Bagian PUT
router.put("/category", adminController.editCategory);
/* Catatan :
  Untuk menggunakan method Put() kita harus menginstall satu library lagi,
  yaitu "method-override",
  'npm install method-override'
*/
// Bagian PUT

router.delete("/category/:id", adminController.deteleCategory);
/* end-point Category */

/* end-point Bank */
router.get("/bank", adminController.viewBank);
router.post("/bank", uploadSingle, adminController.addBank);
router.put("/bank", uploadSingle, adminController.editBank);
router.delete("/bank/:id", uploadSingle, adminController.deleteBank);
/* end-point Bank */

/* end-point Item */
router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.delete("/item/:id/delete", adminController.deleteItem);

/* end-point Detail-Item */
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem);
router.post("/item/add/feature", uploadSingle, adminController.addFeature);
router.put("/item/update/feature", uploadSingle, adminController.editFeature);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);
/* end-point Detail-Item */

/* end-point Activity-Item */
router.post("/item/add/activity", uploadSingle, adminController.addActivity);
router.put("/item/update/activity", uploadSingle, adminController.editActivity);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);
/* end-point Activity-Item */

/* Akhir end-point Item */

/* end-point Booking */
router.get("/booking", adminController.viewBooking);
router.get("/booking/:id", adminController.showDetailBooking);
router.put("/booking/:id/confirmation", adminController.actionConfirmation);
router.put("/booking/:id/reject", adminController.actionReject);
/* end-point Booking */

module.exports = router;
