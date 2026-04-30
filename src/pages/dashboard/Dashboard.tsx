import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Card from '../../components/Card'
import CreateWord from "../../components/CreateWord"

export default function Dashboard() {

    const [word, setWord] = useState({
        'word': '',
        'meaning': '',
        'translate': '',
        'pronunciation': '',
        'audio_url': '',
        'synonyms': [],
        'antonyms': []
    })

    const getWord = async () => {
        try {        
            const response = await api.get('words/random-user')

            setWord({ 
                ...response.data,
                synonyms: Array.isArray(response.data.synonyms)
                    ? response.data.synonyms
                    : JSON.parse(response.data.synonyms || "[]"),
                antonyms: Array.isArray(response.data.antonyms)
                    ? response.data.antonyms
                    : JSON.parse(response.data.antonyms || "[]"),
            })
        } catch (error) {
            alert('Failed to fetch word')
        }
    }

    useEffect(() => {
        getWord()
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <Card
                word={word.word}
                meaning={word.meaning}
                translate={word.translate}
                pronunciation={word.pronunciation}
                audio_url={word.audio_url}
                synonyms={word.synonyms}
                antonyms={word.antonyms}
            />
            <button onClick={getWord} className="btn btn-sm btn-outline-success mt-3">Get Word</button>
            <button className="btn btn-sm btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#createWordModal"> Create Word </button>
            <CreateWord />
        </>
    )
}

