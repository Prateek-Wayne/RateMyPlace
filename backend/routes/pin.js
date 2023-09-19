const {createPin}=require('../controllers/Pin');
const {getPin} =require('../controllers/Pin');
const router=require('express').Router();
router.route('/createpin').post(createPin);
router.route('/getpin').get(getPin);
module.exports=router;