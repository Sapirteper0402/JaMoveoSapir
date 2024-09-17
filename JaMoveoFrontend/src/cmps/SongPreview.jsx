import { Link } from "react-router-dom";

export function SongPreview({ song, onStartSong }) {
    
    return (
        <Link to={`/live/${song._id}`}>
        <article onClick={() => onStartSong(song._id)} className="song-preview">
            <section className="details-image">
                <img src={song.image} alt={song.artist} />
            </section>
            <section className="song-details">
                <p className="details-name">{song.name}</p>
                <p className="details-artist">{song.artist}</p>
            </section>
        </article>
        </Link>  
    )
}
