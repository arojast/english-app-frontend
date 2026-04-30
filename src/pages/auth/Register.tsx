import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            if (password !== passwordConfirm) {
                alert('Passwords do not match')
                return
            }

            await api.post('register', { name, email, password })
            alert('Registration successful')
            navigate('/')
        } catch (error:any) {

            const data = error.response?.data
            console.log(data.message)

            alert('Registration failed: \n' + data?.message )
        }
    }

    const goLogin = async () => {
        navigate('/')
    }

    return (
        <>  
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card p-4 shadow">
                            <h2 className="text-center mb-3">Register</h2>
                            <label className="form-label">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder='Enter Name' className="form-control"/> <br/>
                            <label className="form-label">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value) } placeholder='Enter Email' className="form-control"/> <br/>
                            <label className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } placeholder='Enter password'  className="form-control"/> <br/>
                            <label className="form-label">Confirm Password</label>
                            <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value) } placeholder='Confirm password'  className="form-control"/>
                            <input type="button" value="Register" onClick={handleRegister} className="btn btn-primary mt-3"/>
                            <input type="button" value="Login" onClick={goLogin} className="btn btn-success mt-3"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 