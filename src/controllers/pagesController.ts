import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
    res.render('index', { title: 'Floret Flower Farm' });
};

export const getLoginPage = (req: Request, res: Response) => {
    res.render('login', { title: 'Login', errors: [] });
};

export const getSignupPage = (req: Request, res: Response) => {
    res.render('signup', { title: 'Sign Up', errors: [] });
};

export const getTourPage = (req: Request, res: Response) => {
    res.render('tour', { title: 'Farm Tour' });
};

export const getAboutPage = (req: Request, res: Response) => {
    res.render('about', { title: 'About Us' });
};

export const getHistoryPage = (req: Request, res: Response) => {
    res.render('history', { title: 'Our History' });
};

interface Post {
    title: string;
    image: string;
    excerpt: string;
    date: string;
}

export const getBlogPage = (req: Request, res: Response) => {
    const posts: Post[] = [
        { title: 'How to Grow Zinnias', image: '/images/post-zinnias.jpg', excerpt: 'A step-by-step guide to growing these beautiful, heat-loving flowers from seed to vase.', date: 'July 15, 2024' },
        { title: 'The Rose Ark Project', image: '/images/post-roses.jpg', excerpt: 'Our journey to preserve heritage roses and the progress we\'ve made so far.', date: 'July 10, 2024' },
        { title: 'A Year in Flowers', image: '/images/post-year-in-flowers.jpg', excerpt: 'Reflections on a full year of seasonal beauty and the lessons learned on the farm.', date: 'June 28, 2024' }
    ];
    res.render('blog', { title: 'Our Farm Blog', posts: posts });
};

interface Product {
    name: string;
    price: string;
    image: string;
}

export const getShopPage = (req: Request, res: Response) => {
    const products: Product[] = [
        { name: 'Dahlia Tubers', price: '$24.00', image: '/images/product-1.jpg' },
        { name: 'Zinnia Seeds', price: '$4.50', image: '/images/product-2.jpg' },
        { name: 'Sweet Pea Seeds', price: '$5.00', image: '/images/product-3.jpg' },
        { name: 'Garden Snips', price: '$28.00', image: '/images/product-4.jpg' },
        { name: 'Ranunculus Corms', price: '$18.00', image: '/images/product-5.jpg' },
        { name: 'Floret\'s Favorite T-shirt', price: '$32.00', image: '/images/product-6.jpg' }
    ];
    res.render('shop', { title: 'Shop', products: products });
};