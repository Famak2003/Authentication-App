import { useEffect, useState } from 'react';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';



function App() {
  const [darkmode, setDarkmode] = useState(
    localStorage.getItem('dark-mode') === "true"
  )

  useEffect(() =>{
    const root = window.document.documentElement
    if (darkmode){
      root.classList.add('dark')
    }else{
      root.classList.remove('dark')
    }

    //save dark-mode preference
    localStorage.setItem("dark-mode", darkmode);
  }, [darkmode])


  return (
    <div className="App flex flex-col bg-teal-500 dark:bg-[#1a0d0c] min-h-[100vh] max-h-fit text-black dark:text-white p-2">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button className=' flex rounded-xl ring-2 ring-black dark:ring-white p-3 self-end ' onClick={() => { 
          setDarkmode(!darkmode)
       }} >
        dark mode 👾
      </button>
      <div className=' my-2 ring-2 ring-black dark:ring-white rounded-xl p-2 h-[50vh] '>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
