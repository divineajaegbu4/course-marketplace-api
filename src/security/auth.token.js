import jwt from "jsonwebtoken"

export class AuthToken {
    static sign(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: process.env.expiresIn})
    }

    static verify(payload) {
        return jwt.verify(payload, process.env.SECRET_KEY)
    }
}