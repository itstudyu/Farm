import { Router } from 'express';
import { getHomePage, getLoginPage, getSignupPage, getTourPage, getAboutPage, getHistoryPage, getBlogPage, getShopPage } from '../controllers/pagesController';

const router = Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/signup', getSignupPage);
router.get('/tour', getTourPage);
router.get('/about', getAboutPage);
router.get('/history', getHistoryPage);
router.get('/blog', getBlogPage);
router.get('/shop', getShopPage);

export default router; 