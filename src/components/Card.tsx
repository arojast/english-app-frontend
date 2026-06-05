import { useState } from "react"

interface cardProps {
    word: string
    meaning: string
    translate: string
    pronunciation: string
    audio_url: string
    synonyms: string[]
    antonyms: string[]
}

export default function Card({ word, meaning, translate, pronunciation, audio_url, synonyms, antonyms }: cardProps) {
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    return (
        <div className="card shadow-sm rounded-4 p-4 mt-3">
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