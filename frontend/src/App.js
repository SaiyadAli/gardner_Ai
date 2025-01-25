import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // State variables to store question, answer, and welcome message
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    // useEffect hook to fetch the welcome message when the component mounts
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

    // Function to handle form submission and fetch the answer from the server
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
                {/* Display the welcome message */}
                <h1>{welcomeMessage}</h1>
                {/* Form to submit a question */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        placeholder="Ask a question" 
                    />
                    <button type="submit">Submit</button>
                </form>
                {/* Display the answer */}
                <p>{answer}</p>
            </header>
        </div>
    );
}

export default App;
