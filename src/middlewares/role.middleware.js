import { AuthenticationException } from "../exceptions/authentication.exception.js"

export function role(roles) {
    return (req, res, next) => {
        if(!req.user) {
            throw new AuthenticationException("User not authenticated")
        }

       

        if(roles.includes(req.user.role)) {
            console.log("Access granted!");
            return next();
        } else {
            throw new AuthenticationException("Insufficient permissions");
        }

    }
}