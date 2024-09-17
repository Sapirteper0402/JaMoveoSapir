import { useNavigate, useParams } from "react-router-dom"
import { songService } from "../services/song.service";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../App.jsx'
import { socketService } from '../services/socket.service';

export function LivePage() {
    const [song, setSong] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const [scrolling, setScrolling] = useState(false);
    const { currentUser } = useContext(UserContext)


    useEffect(() => {
        loadSong()
    }, [params.songId])

    useEffect(() => {
        // Listen for the session end event
        socketService.on('session-ended', () => {
            navigate(currentUser.isAdmin ? '/admin' : '/player');  
        });

        // Clean up on component unmount
        return () => {
            socketService.off('session-ended');
        };
    }, [navigate]);

    useEffect(() => {
        if (scrolling) {
            const interval = setInterval(() => {
                window.scrollBy(0, 10); 
            }, 100);
            return () => clearInterval(interval);
        }
    }, [scrolling]);


    async function loadSong() {
        try {
            const song = await songService.getById(params.songId)
            setSong(song) 
        } catch (err) {
            console.log('Had issues loading song', err);
        }
        
    }

    function toggleScrolling() {
        setScrolling(!scrolling);
    }

    function onQuit() {
        socketService.emit('admin-quit')
        navigate('/admin')
    }

    if (!song) return <div>Loading song..</div>
    return (
        <section className="page-container live-page">
            <h1>{song.name} - {song.artist}</h1>
            <section className="lyrics-container">
                <div className="song-container">
                    {song.lyrics.map((line, lineIndex) => (
                        <div key={lineIndex} className="line-container">
                            {line.map((word, wordIndex) => (
                                <div key={wordIndex} className="word-container">
                                    {currentUser.instrument !== "vocals" ? (
                                        <>
                                            {word.chords && <div className="chords">{word.chords}</div>}
                                            <div className="lyrics">{word.lyrics}</div>
                                        </>
                                    ) : (
                                        <div className="lyrics">{word.lyrics}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
            <div className="floating-buttons">
                <button className="toggle-scroll" onClick={toggleScrolling}>
                    {scrolling ? "Stop Scrolling" : "Start Scrolling"}
                </button>
                {currentUser.isAdmin && <button className="quit-button" onClick={onQuit}>Quit</button>}
            </div>
        </section>
    )
}

