import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8000/');
                setWelcomeMessage(response.data.message);
            } catch (error) {
                console.error("There was an error fetching the welcome message:", error);
            }
        };
        fetchWelcomeMessage();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/interview', { question });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>{welcomeMessage}</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        placeholder="Ask a question" 
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{answer}</p>
            </header>
        </div>
    );
}

export default App;
