const {createPin}=require('../controllers/Pin');
const router=require('express').Router();
router.route('/pin').post(createPin);
module.exports=router;