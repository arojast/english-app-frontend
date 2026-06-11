import { useEffect, useState } from "react";
import type { Word } from "../../types/Word"
import { api } from "../../services/api";
import Card from "../../components/Card";

//last words added to the app
export default function Last() {
    const [words, setWords] = useState<Word[]>([])

    const getWords = async () => {
        const response = await api.get(`/words/last`)
        setWords(response.data)
    }

    useEffect(() => {
      getWords()
    }, [])

    return (
      <>
        <div className="container mt-4">

          <h2>Last Additions</h2>

          {/* List */}
          <div className="row">
            {words.map((w) => (

              <div className="col-md-6 mb-3" key={w.id}>
                <Card
                  id={w.id}
                  word={w.word}
                  meaning={w.meaning}
                  translate={w.translate}
                  pronunciation={w.pronunciation}
                  audio_url={w.audio_url}
                  synonyms={w.synonyms}
                  antonyms={w.antonyms}
                  pivot={{ is_favorite: (w.pivot && w.pivot.is_favorite) ?? false, is_learned: (w.pivot && w.pivot.is_learned) ?? false }}
                />
              </div>
            ))}
          </div>

        </div>
      </>
    )
}