import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card'
import CreateWord from "../../components/CreateWord"

export default function Dashboard() {
    const localToken = localStorage.getItem('token')

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
            const response = await axios.get(
                'http://localhost:8000/api/words/random-user',
                {
                    headers: {
                        Authorization: `Bearer ${localToken}`,
                    },
                },
            )
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
            <button className="btn btn-sm btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#createWord"> Create Word </button>
            <CreateWord />
        </>
    )
}

