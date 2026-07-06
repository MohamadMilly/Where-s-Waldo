import { prisma } from "../lib/prisma.js";
import { sign } from "../utils/auth/jwt.js";
export const createUserPost = async (req, res, next) => {
    const { name } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
            },
        });
        const token = sign(user);
        res.json({
            user: user,
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
};
