import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() { 
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    axios.defaults.withCredentials = true

    const handleLogout = () => { 
        axios.get("http://localhost:8081/logout")
            .then((res) => {
                location.reload(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then((res) =>{
                // console.log(res.data.status)
                
                if (res.data.status === 'success'){
                    setAuth(true)
                    setName(res.data.name)
                }else{
                    setAuth(false)
                    setMessage(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])
    return(
        <div>
            <p>Hello welcome home</p>
            {
                auth ? 
                    <div>
                        <p>
                            You are authorised ------- {name}
                        </p>
                        <button onClick={handleLogout} className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " >
                            Logout
                        </button>
                    </div>

                :
                    <div>
                        <p>
                            Authorization Failed: {message}
                        </p>
                        <button onClick={()=> navigate("/login")} className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " >
                            Login
                        </button>
                    </div>
            }
        </div>
    )
};

export default Home;