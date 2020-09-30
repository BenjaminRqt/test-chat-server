import jwt from "jsonwebtoken"

const auth = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('Invalid user ID');
        }
        next();
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

export default auth
