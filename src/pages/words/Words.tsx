import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Card from "../../components/Card";

export default function Words() {
    const [words, setWords] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [search, setSearch] = useState('')

    const getWords = async () => {
        const response = await api.get(`/words?page=${page}&search=${search}`)
        setWords(response.data.data)
        setLastPage(response.data.last_page)
    }

    useEffect(() => {
      getWords()
    }, [page])

    return (
      <>
        <div className="container mt-4">

          <h2>Words</h2>

          {/* Filter */}
          <input className="form-control mb-3" placeholder="Search word..."
            value={search} onChange={(e) => setSearch(e.target.value)} />

          <button className="btn btn-primary mb-4" onClick={() => { 
              setPage(1) 
              getWords()
            }}
          >
            <i className="bi bi-search"></i> Search
          </button>

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
                  is_favorite={w.is_favorite ?? (w.pivot && w.pivot.is_favorite) ?? false}
                  is_learned={w.is_learned ?? (w.pivot && w.pivot.is_learned) ?? false}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <i className="bi bi-arrow-left"></i> Previous
            </button>

            <span>Page {page} of {lastPage}</span>

            <button
              className="btn btn-secondary"
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
            >
              Next <i className="bi bi-arrow-right"></i> 
            </button>
          </div>

        </div>
      </>
    )
}