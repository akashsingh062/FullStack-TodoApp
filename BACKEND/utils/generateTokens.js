import jwt from "jsonwebtoken"

export function generateToken(userId) {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

export function verifyToken(token) {
    if (!token) {
        throw new Error("Login to continue.")
    }
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new Error("Invalid token.")
    }
}

export function decodeIdFromToken(token) {
    if (!token) {
        throw new Error("Login to continue.")
    }
    const decoded = jwt.decode(token)
    if (!decoded) {
        throw new Error("Invalid token.")
    }
    return decoded.userId
}
