const {register}=require('../controllers/User');
const{login}=require('../controllers/User');
const router=require('express').Router();
router.route('/register').post(register);
router.route('/login').post(login);
module.exports=router;