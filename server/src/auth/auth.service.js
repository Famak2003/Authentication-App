import HttpStatus from "../httpStatus.js";
import bcrypt from 'bcrypt' 
import getQuery from "../utils/getQuerry.js";
export default class AuthService {
    
    salt = 10

    login (){
        return 'success'
    }

    async register (name, email, password){
        if (!name || !email || !password) {
            return {code: HttpStatus.BAD_REQUEST.code, status: "Missing required fields"};
        }
        const GETQUERY = "SELECT * FROM login WHERE email = ?"
        try{
            const result = await getQuery(GETQUERY, [email])

            if(result.length > 0){
                return {code: 403, status: "Email has been used"}
            }
            
            const QUERY = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";

            const hash = await bcrypt.hash(password.toString(), this.salt) // promise base version of hash is better than the callback version

            if (!hash) {
                console.error("Hashing error:", err);
                return {code: HttpStatus.INTERNAL_SERVER_ERROR.code , status: "Password Error"}
            }

            const values = [
                name,
                email,
                hash
            ]

            try {
                await getQuery(QUERY, [values])
                return HttpStatus.OK;
            } catch (error) {
                return HttpStatus.INTERNAL_SERVER_ERROR
            }

        }
        catch(err) {
            return {code: HttpStatus.INTERNAL_SERVER_ERROR.code, status: `Database Error ===> ${err}`};
        }
    }
}