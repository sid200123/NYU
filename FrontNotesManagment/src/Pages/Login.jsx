import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const loginUSer = (e) => {

    e.preventDefault()
    // Send registration data to the server
    const loginData = {email,password}
    
    console.log(loginData)
    axios.post("http://localhost:8080/user/login", loginData).then((res) => {
      if(res.status === 201){
        setEmail("")
        setPassword("")  
        localStorage.setItem("note_token", res.data.token)
        navigate("/")
        alert(res.data.message)
      }
    })

    console.log("user registration")
  }
  return (
    <div className='flex w-full h-[100vh] items-center justify-center bg-slate-200'>
      <div className='w-[50%] h-fit'>
      <h1 className='mb-5 font-bold text-2xl'>Login</h1>
      <form className='flex flex-col gap-3' onSubmit={loginUSer}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} className='border w-full px-2 py-1' name="email" />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} className='border w-full px-2 py-1' name="password" />
        </label>
        <input type="submit" className='border border-blue-500 font-bold py-2 cursor-pointer rounded-sm mt-5 hover:text-white hover:bg-blue-500' value="Login" />
      </form>
      <div className='w-full text-end mt-5'>
      <p>Don't have an account? <Link to="/register" className='text-blue-500'>Register</Link></p>
      </div>
      </div>
    </div>
  )
}

export default Login