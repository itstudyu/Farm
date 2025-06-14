import { Request, Response, NextFunction } from 'express';

// Extend the Express session interface to include our custom properties
declare module 'express-session' {
  interface SessionData {
    user?: { id: number; name: string; email: string; };
    flash?: { type: string; message: string; };
  }
}

export const localsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Make user data available in templates
    res.locals.user = req.session.user || null;

    // Make flash messages available in templates, then clear them
    if (req.session.flash) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
    } else {
        res.locals.flash = null;
    }

    next();
}; 