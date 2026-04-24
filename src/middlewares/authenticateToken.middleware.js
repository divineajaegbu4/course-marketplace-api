import { AutthorizationException } from "../exceptions/authorization.exception.js";
import { AuthToken } from "../security/auth.token.js";

export function authenticateToken() {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.json(new AutthorizationException("Authorization header is missing."))
        }

        console.log(authHeader);

        const [, token] = authHeader.split(" ")

        if(!token) {
            return res.json(new AutthorizationException("Token is missing."))
        }

        
        req.user = AuthToken.verify(token)

        next();
    }

}

