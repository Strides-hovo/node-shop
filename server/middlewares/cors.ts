import cors from 'cors';

export const corsOptions = {
    origin: process.env.FRONTED_URL, 
    optionsSuccessStatus: 200 // Для поддержки старых браузеров
};

export const corsMiddleware = cors(corsOptions);
