import { useState } from "react"
import { api } from "../services/api"

import { toast } from 'react-toastify'

export default function CreateWord() {

    const [word, setWord] = useState("")
    
    const handleSubmit = async (e:any) => {
        e.preventDefault()

        try {

            await api.post('words',
                {
                    'word': word
                }
            )

            toast.success("Word created!")

            const closeButton = document.getElementById("closeModalButton")
            closeButton?.click()
            setWord("")

        } catch (error:any) {
            toast.error("Error creating word: " + (error.response?.data?.message || error.message))
        }
    }

    return (
        <div className="modal fade" id="createWordModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Create Word</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <input className="form-control mb-2" placeholder="Word" value={word} onChange={(e)=>setWord(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeModalButton" className="btn btn-secondary" data-bs-dismiss="modal">
                                <i className="bi bi-x"></i> Cancel
                            </button>
                            <button className="btn btn-primary">
                                <i className="bi bi-floppy"></i> Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}