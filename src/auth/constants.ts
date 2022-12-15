
const secretKey: string | null = process.env.JWT_SECRET_KEY;

if (!secretKey) {
    throw new Error('Secret key is not defined');
}

export const jwtConstants = {
    secret: secretKey,
};