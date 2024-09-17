
import { useContext, useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App.jsx'

export function Login() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [user, setUser] = useState({ username: '', password: ''})
    const [errorMessage, setErrorMessage] = useState('')
  

    useEffect(() => {
        if(currentUser) {
            onLogout()
        } 
    }, [])

    function handleChange(ev) {
        const val = ev.target.value
        let { value, name: field } = ev.target
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function onLogout() {
        try {
            await userService.logout()
            setCurrentUser(null)
        } catch (err) {
            console.log('can not logout');
        }
    }

    async function onSubmitForm(ev) {
        ev.preventDefault()

        if (!user.username || !user.password) {
            setErrorMessage('All fields are required')
            return
        }

        try {
            const loginUser = await userService.login(user)
            setCurrentUser(loginUser)
            setErrorMessage('')

            if (loginUser.isAdmin === true) {
                navigate('/admin')
            } else {
                navigate('/player')
            }

        } catch (err) {
            setErrorMessage('Login failed. Please check your credentials and try again')
            throw err
        }
    }


    
    return (
        <section className="page-container login-signup">
        <h1>Login</h1>


        <form onSubmit={onSubmitForm}>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
            />
            
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Login</button>
        </form>

        <p className="to-signup-or-login">    
            <span>Don't have an account? </span>
            <Link to="/signup">Click here to sign up</Link>
        </p>
    </section>
    )
}

