import { useState } from "react"
import { api } from "../services/api"

interface cardProps {
    id: number
    word: string
    meaning: string
    translate: string
    pronunciation: string
    audio_url: string
    synonyms: string[]
    antonyms: string[]
    is_favorite?: boolean
    is_learned?: boolean
}

export default function Card({ id, word, meaning, translate, pronunciation, audio_url, synonyms, antonyms, is_favorite, is_learned }: cardProps) {
    const [showDetails, setShowDetails] = useState(false)
    const [is_favorite_state, setIsFavorite] = useState<boolean>(!!is_favorite)
    const [is_learned_state, setIsLearned] = useState<boolean>(!!is_learned)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const changeIsFavorite = async (e: any) => {
        e.preventDefault()

        const newValue = !is_favorite_state

        try {
            await api.patch(`words/${id}/favorite`, {
                is_favorite: newValue ? 1 : 0,
            })

            setIsFavorite(newValue)
        } catch (error) {
            alert("Error updating favorite status")
        }
    }

    const changeIsLearned = async (e: any) => {
        e.preventDefault()

        const newValue = !is_learned_state

        try {
            await api.patch(`words/${id}/learned`, {
                is_learned: newValue ? 1 : 0,
            })

            setIsLearned(newValue)
        } catch (error) {
            alert("Error updating learned status")
        }
    }

    return (
        <div  className="card shadow-sm rounded-4 p-4 mt-3">
            <div className="position-absolute top-0 end-0 pt-3 pe-3 d-flex gap-2">
                <a href="#" onClick={changeIsFavorite}>
                    {is_favorite_state ? <i className="bi bi-star-fill"></i>:<i className="bi bi-star"></i>}
                </a> &nbsp;
                <a href="#" onClick={changeIsLearned}>
                    {is_learned_state ? <i className="bi bi-check-circle-fill"></i>:<i className="bi bi-check-circle"></i>}
                </a>
            </div>

            <h2 className="text-primary">{word}</h2>
            <p><strong>Pronunciation:</strong> {pronunciation}</p>
            <p><strong>Meaning:</strong> {meaning}</p>
            <p><strong>Translation:</strong> {translate}</p>

            <button type="button" className="btn btn-sm btn-outline-primary mt-3" onClick={toggleDetails}>
                {showDetails ? <span><i className="bi bi-eye-slash"></i> Hide Details </span> : 
                                <span><i className="bi bi-eye"></i> Show Details</span>} 
            </button>

            {showDetails && (
                <div className="mt-3">

                    <h6>Synonyms</h6>
                    <ul>
                        {synonyms.length != 0 && typeof synonyms === 'object' && synonyms.map((s, index) => (
                            <li key={index}>{s}</li>
                        ))}
                    </ul>

                    <h6>Antonyms</h6>
                    <ul>
                        {antonyms.length != 0 && typeof antonyms === 'object' && antonyms.map((a, index) => (
                            <li key={index}>{a}</li>
                        ))}
                    </ul>

                    {audio_url && (
                        <audio key={audio_url} controls>
                            <source src={audio_url} type="audio/mpeg" />
                        </audio>
                    )}

                </div>
            )}
           
        </div>
    )
}