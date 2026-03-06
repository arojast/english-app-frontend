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
    return (
        <div className="card">
            <h2>Word: {word}</h2>
            <p>Meaning: {meaning}</p>
            <p>Translate: {translate}</p>
            <p>Pronunciation: {pronunciation}</p>
            {
                /**
                 *  <audio controls src={audio_url}>
                        Your browser does not support the audio element.
                    </audio>
                 * 
                 */
            }
            
            <h3>Synonyms</h3>
            <ul>
                <li>Synonym 1</li>
                <li>Synonym 2</li>
            </ul>
            <h3>Antonyms</h3>
            <ul>
                <li>Antonym 1</li>
                <li>Antonym 2</li>
            </ul>
        </div>
    )
}