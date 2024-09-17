import { useContext } from "react"
import { UserContext } from '../App.jsx'
import { Link } from "react-router-dom";


export function AppHeader() {
    const { currentUser } = useContext(UserContext)

    return (
        <header className="app-header">
        <section className="container">
            <div className="logo">
                <span>JaMoveo</span>
            </div>

            {currentUser && (
                <div className="user-info">
                    <span>Hello {currentUser.username}</span>
                    <Link to={'/login'}><button>Logout</button></Link>
                </div>
            )}
        </section>
    </header>
    )
}