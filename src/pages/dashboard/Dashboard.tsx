import { useEffect, useState } from 'react'
import type { Word } from "../../types/Word"
import { api } from '../../services/api'
import Card from '../../components/Card'
import CreateWord from "../../components/CreateWord"

import { toast } from 'react-toastify'

export default function Dashboard() {

    const [word, setWord] = useState<Word>({
        id: undefined,
        word: "",
        meaning: "",
        translate: "",
        pronunciation: "",
        audio_url: "",
        synonyms: [],
        antonyms: [],
        pivot: {
            is_favorite: false,
            is_learned: false,
        }
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
                pivot: {
                    is_favorite: (response.data.pivot && response.data.pivot.is_favorite) ?? false,
                    is_learned: (response.data.pivot && response.data.pivot?.is_learned) ?? false,
                }
            })
        } catch (error) {
            toast.error('Failed to fetch word')
        }
    }

    useEffect(() => {
        getWord()
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <Card
                id={word.id}
                word={word.word}
                meaning={word.meaning}
                translate={word.translate}
                pronunciation={word.pronunciation}
                audio_url={word.audio_url}
                synonyms={word.synonyms}
                antonyms={word.antonyms}
                pivot={word.pivot}
            />
            <button onClick={getWord} className="btn btn-sm btn-outline-success mt-3">
                <i className="bi bi-shuffle"></i> Get Word
            </button>
            <button className="btn btn-sm btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#createWordModal"> 
                <i className="bi bi-plus"></i> Create Word 
            </button>
            <CreateWord />
        </>
    )
}

