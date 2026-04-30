import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await api.post('login', { email, password })

            localStorage.setItem('isAuth', 'true')
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (error) {
            alert('Login failed')
        }
    }

    const goRegister = async () => {
        navigate('/register')
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card p-4 shadow">
                            <h2 className="text-center mb-3">Login</h2>
                            <label className="form-label">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value) } placeholder='Enter Email' className="form-control"/> <br/>
                            <label className="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } placeholder='Enter password'  className="form-control"/>
                            <input type="button" value="Login" onClick={handleLogin} className="btn btn-primary mt-3"/>
                            <input type="button" value="Register" onClick={goRegister} className="btn btn-success mt-3"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}