import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Register() { 
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:8081/register', formData)
            .then((res) =>{
                console.log(res)
                if (res.status === 200){
                    navigate('/login', {replace: true})
                }else{
                    alert('Hey! big man, response has tanked bruv')
                }
            })
            .catch(err => console.log(err))
        
    }
    


    return(
        <div className=" flex flex-col gap-2 " >
            <h1>Sign-Up</h1>
            <form className=" flex flex-col gap-2 ring-2 ring-black rounded-xl p-2 dark:text-black " onSubmit={handleSubmit} >
                <label className="overflow-hidden p-2 bg-[#343b39] rounded-lg" htmlFor="name">
                    <input required className=" w-80 rounded-lg p-2" 
                        onChange={(e) => 
                            setFormData((prev) => (
                                { ...prev, [e.target.name]: e.target.value }
                            )
                        )}
                        name="name" 
                        type="text" 
                        placeholder="Enter Name"
                    />
                </label>
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
                    Sign up
                </button>
                <span>
                    You have read and agreed to our terms and condition
                </span>
                <button 
                    onClick={()=>{
                        navigate('/login')
                    }} 
                    className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " 
                >
                    Login
                </button>
            </form>
        </div>
    )
};

export default Register

