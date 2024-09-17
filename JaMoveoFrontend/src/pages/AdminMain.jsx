import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { songService } from "../services/song.service"

export function AdminMain() {
    const navigate = useNavigate();
    const [filterBy, setFilterBy] = useState(songService.getDefaultFilter())

    function handleChange(ev){
        const val = ev.target.value;
        setFilterBy(prevFilter => ({ ...prevFilter, txt: val }))
    }

    function onSearchSong(ev) {
        ev.preventDefault()

        // Check if the search bar is empty
        if (!filterBy.txt.trim()) {
            alert('Please enter a song name or artist to search')
            return;
        }
        navigate('/results', { state: { filterBy } })
    }

    return (
        <section className="page-container admin-main">
            <h1>Search any song...</h1>
            <form onSubmit={onSearchSong}>
                <label htmlFor="txt">Enter song name or artist:</label>
                <input id="txt" name="txt" value={filterBy.txt} type="text" onChange={handleChange} placeholder="Search for a song"/>
                <button>Search</button>
            </form>
        </section>
    )
}