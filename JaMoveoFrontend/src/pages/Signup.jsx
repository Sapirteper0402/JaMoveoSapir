import { useContext, useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App.jsx'

export function Signup() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [user, setUser] = useState(userService.getEmptyUser())
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(currentUser) {
            onLogout()
        } 
    }, [])

    function handleChange(ev) {
        const val = ev.target.value;
        let { value, name: field } = ev.target
        setUser(prevUser => ({ ...prevUser, [field]: value }))
    }


    async function onSubmitForm(ev) {
        ev.preventDefault()

        if (!user.username || !user.password || !user.instrument) {
            setErrorMessage('All fields are required')
            return
        }
        
        try {
            const signUser = await userService.signup(user)
            setCurrentUser(signUser)
            setErrorMessage('')
            navigate('/player')
        } catch (err) {
            setErrorMessage('Signup failed. Please try again')
            throw err
        }
        
    }

    async function onLogout() {
        try {
            await userService.logout()
            setCurrentUser(null)
        } catch (err) {
            console.log('can not logout');
        }
    }

    return (
        <section className="page-container login-signup">
            <h1>Sign Up</h1>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
                
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />

                <label htmlFor="instrument">Instrument:</label>
                <select id="instrument" name="instrument" value={user.instrument} onChange={handleChange} placeholder="Select Instrument" required >
                    <option value="">Select an instrument</option>    
                    <option value="drums">Drums</option>
                    <option value="guitar">Guitar</option>
                    <option value="bass">Bass</option>
                    <option value="saxophone">Saxophone</option>
                    <option value="keyboards">Keyboards</option>
                    <option value="vocals">Vocals</option>
                </select>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button>Sign Up</button>
            </form>

            <p className="to-signup-or-login">
                <span>Already have an account? </span>
                <Link to="/login">Click here to log in</Link>
            </p>
    </section>
    )
}
