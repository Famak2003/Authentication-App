import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() { 
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    axios.defaults.withCredentials = true

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:8081/login', formData)
            .then((res) =>{
                // console.log(res.data.status)
                
                if (res.data.status === 'success'){
                    navigate('/')
                }else{
                    alert('Hey! big man, who are you for real bruv🤨')
                }
            })
            .catch(err => console.log(err))
        
    }
    


    return(
        <div className=" flex flex-col gap-2 " >
            <h1>Sign-In</h1>
            <form className=" flex flex-col gap-2 ring-2 ring-black rounded-xl p-2 " onSubmit={handleSubmit} >
                <label className=" overflow-hidden p-2 bg-[#343b39] rounded-lg " htmlFor="email">
                    <input required className="w-80 rounded-lg p-2"
                        onChange={(e) => 
                            setFormData((prev) => (
                                { ...prev, [e.target.name]: e.target.value }
                            )
                        )}
                        name="email" 
                        type="email" 
                        placeholder="Enter Email" />
                </label>
                <label className=" overflow-hidden p-2 bg-[#343b39] rounded-lg " htmlFor="password">
                    <input required className="w-80 rounded-lg p-2"
                        onChange={(e) => 
                            setFormData((prev) => (
                                { ...prev, [e.target.name]: e.target.value }
                            )
                        )}
                        name="password" 
                        type="password" 
                        placeholder="Enter Password" />
                </label>
                <button className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " type="submit" >
                    SignIn
                </button>
                <span>
                    Thank you for visting, we are glad you came back!.
                </span>
                <button 
                    onClick={()=>{
                        navigate('/register')
                    }} 
                    className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " 
                >
                    Create Account
                </button>
                <small className=" ml-2 text-red-500 ">
                    Have an account with us?, sign up here🫰🏾
                </small>
            </form>
        </div>
    )
 };

 export default Login