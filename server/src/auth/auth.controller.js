import authService from './auth.service.js'
const AuthService = new authService()

export const AuthController = {
    login: (req, res) => {
        return res.json({status: "success", name: req.name})
    },
    register: async (req, res) => {
        const {name, email, password} = req?.body
        const result = await AuthService.register(name, email, password)
        console.log(result)
        return res.send(result)
    }
}