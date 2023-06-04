import React, { useState } from 'react'

const Base = () => {
    const [StartTime, setStartTime] = useState("")
    const [EndTime, setEndTime] = useState("")
    const [Reply, setReply] = useState("")
    const [Loading, setLoading] = useState(false)

    function SubmitHandler() {
        setLoading(true)
        fetch("http://localhost:8000/api/video/to/text/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StartTime: StartTime,
                EndTime: EndTime
            })
        })
            .then(response => response.json())
            .then(responseData => {
                setReply(responseData);
                setLoading(false)
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
                setLoading(false)
            });
    }

    return (
        <div
            style={{
                marginTop: "20px",
            }}
        >
            <video width="640" height="360" controls>
                <source src="Videos/test.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div>
                <input
                    type="number"
                    id="start_clip"
                    name="start_clip"
                    onChange={(e) => setStartTime(e.target.value)}
                ></input>
                <input
                    type="number"
                    id="end_clip"
                    name="end_clip"
                    onChange={(e) => setEndTime(e.target.value)}
                ></input>

                <button onClick={() => {
                    SubmitHandler()
                }}>
                    Submit
                </button>
            </div>

            <div>
                <textarea
                    value={Loading ? "Loading Data Plz Wait...." : Reply.text}
                    style={{
                        marginTop: "20px",
                        height: "200px",
                        width: "500px"
                    }}
                />
            </div>
        </div>
    )
}

export default Base