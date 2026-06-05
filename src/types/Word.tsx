export interface Word {
    id?: number
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