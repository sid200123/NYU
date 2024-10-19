import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const registerUSer = (e) => {

    e.preventDefault()
    // Send registration data to the server
    const regisetrData = {name,email,password}
    
    console.log(regisetrData)
    axios.post("http://localhost:8080/user/register", regisetrData).then((res) => {
      if(res.status === 201){
        setName("")
        setEmail("")
        setPassword("")  

        alert(res.data.message)
      }
    })

    console.log("user registration")
  }
  return (
    <div className='flex w-full h-[100vh] items-center justify-center bg-slate-200'>
      <div className='w-[50%] h-fit'>
      <h1 className='mb-5 font-bold text-2xl'>Register</h1>
      <form className='flex flex-col gap-3' onClick={registerUSer}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => {
            setName(e.target.value);
          }} className='border w-full px-2 py-1' name="name" />
        </label>
        <label>
          Email:
          <input value={email} type="email" onChange={(e) => {
            setEmail(e.target.value);
          }} className='border w-full px-2 py-1' name="email" />
        </label>
        <label>
          Password:
          <input value={password} type="password" onChange={(e) => {
            setPassword(e.target.value);
          }} className='border w-full px-2 py-1' name="password" />
        </label>
        <input type="submit" className='border border-blue-500 font-bold py-2 cursor-pointer rounded-sm mt-5 hover:text-white hover:bg-blue-500' value="Register" />
      </form>
      <div className='w-full text-end mt-5'>
      <p>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
      </div>
      </div>
    </div>
  )
}

export default Register