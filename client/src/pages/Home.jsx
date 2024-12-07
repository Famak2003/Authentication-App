import axios from "axios";
import { useEffect, useState } from "react";
import {Bounce, toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

function Home() { 
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    // const history = useHistory()
    axios.defaults.withCredentials = true

    const handleLogout = () => { 
        axios.get("http://localhost:8081/logout")
            .then((res) => {
                window.location.reload()
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
        const loggedInFlag = localStorage.getItem("justLoggedIn")
        if (loggedInFlag){
            toast.success("Wecome back! we're excited to see you again", {autoClose: 3000, position: "top-right", hideProgressBar: false, pauseOnHover: true, transition: Bounce})
            localStorage.removeItem("justLoggedIn")
        }
        console.log(loggedInFlag)
    }, [])



    // useEffect(() => {

    // }, [history])
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
                        {/* <br/>
                        <button className=" ring-2 p-2 rounded-lg m-2 bg-white" onClick={() => {
                            toast.success("hello")
                        }} >
                            toast
                        </button> */}
                    </div>

                :
                    <div>
                        <p>
                            Authorization Failed: {message}
                        </p>
                        <button onClick={()=> navigate("/login", {replace: true})} className=" dark:text-black dark:bg-teal-500 p-2 bg-white rounded-lg hover:bg-transparent hover:ring-2 hover:ring-white " >
                            Login
                        </button>
                    </div>
            }
        </div>
    )
};

export default Home;