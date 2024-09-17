import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { songService } from "../services/song.service"
import { SongList } from "../cmps/SongList"
import { socketService } from '../services/socket.service'


export function ResultsPage() {
    const navigate = useNavigate();
    const location = useLocation()
    const { filterBy: initialFilterBy } = location.state || { filterBy: {txt: ''} };

    const [songs, setSongs] = useState(null)
    const [filterBy, setFilterBy] = useState(initialFilterBy)

    useEffect(() => {
        loadSongs()
    }, [filterBy])

    // Function to load songs based on the filter criteria
    async function loadSongs() {
        try {
            const songs = await songService.query(filterBy)
            setSongs(songs)
        } catch (err) {
            console.log('Had issues loading songs', err)
        }
    }

    // Function to reset the filterBy and reload the full list of songs
    function onSongList() {
        setFilterBy({ txt: '' })
    }

    // Function to start a song (admin selects it)
    function onStartSong(songId) {
        socketService.emit('admin-select-song', songId); 
        navigate(`/live/${songId}`); // Admin goes to LivePage
    }


    if(!songs) return <div>Loading..</div>
    return (
        <section className="page-container results-page">
            <h1>Song Results</h1>

            {filterBy.txt && songs.length === 0 && (
                <section className='no-found'>
                    <p>No songs found matching "{filterBy.txt}".</p>
                    <section className="button-container">
                        <Link to="/admin"><button>Back to search</button></Link>
                        <button onClick={onSongList}>Song List</button>
                    </section>
                </section>
            )}

            { songs.length > 0 && 
                <>
                    <SongList songs={songs} onStartSong={onStartSong}/>
                    <section className="button-container">
                        <Link to="/admin"><button>Back to search</button></Link>
                    </section>
                </>
            }
        </section>
    )
}