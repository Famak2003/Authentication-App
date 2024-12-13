import db from "../config/mysql.config.js"


const getQuery = async (querry, values) => {
    return await new Promise((resolve, reject) =>{
        db.query(querry, values, (err, result) => {
            if (err){
                return reject(err)
            }
            resolve(result)
        })
    })
}

export default getQuery