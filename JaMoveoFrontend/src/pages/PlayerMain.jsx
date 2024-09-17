import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { socketService } from '../services/socket.service'

export function PlayerMain() {
    const navigate = useNavigate()

    useEffect(() => {
        // Listen for the song selection
        socketService.on('song-selected', (songId) => {
            navigate(`/live/${songId}`);
        })

        // Clean up on component unmount
        return () => {
            socketService.off('song-selected')
        }
    }, [navigate])
 
    return (
        <section className="page-container player-main">
            <h1>Waiting for next song</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music mx-auto text-indigo-600 mb-4"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        </section>
    )
}
