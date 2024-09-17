import { SongPreview } from "./SongPreview";

export function SongList({ songs, onStartSong }) {
    
    return (
        <ul className="song-list">
            {
                songs.map(song => <li key={song._id}>
                    <SongPreview song={song} onStartSong={onStartSong} />
                </li>)
            }
        </ul>
    )
}
