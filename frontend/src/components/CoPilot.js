import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function CoPilot({ account, socket }) {
    const [messages, setMessages] = useState([{ sender: 'pilot', text: 'Welcome, Julia. This space is sacred. It is here to listen. What is true for you right now?' }]);
    const [input, setInput] = useState('');
    const logRef = useRef(null);

    useEffect(() => {
        if (!socket) return;
        
        const handlePoccResponse = (data) => {
            setMessages(prev => [...prev, { sender: 'pilot', text: data.guidance }]);
        };

        socket.on('pocc_response', handlePoccResponse);
        return () => { socket.off('pocc_response', handlePoccResponse); };
    }, [socket]);

    useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || !socket) return;
        const text = input; setInput('');
        setMessages(prev => [...prev, { sender: 'user', text }]);
        socket.emit('pocc', { accountId: account.id, text: text });
    };

    return (
        <div className={styles.container}>
            <Head><title>Mindpath | Your Sanctuary</title></Head>
            <header className={styles.header}>
                <div className={styles.logo}>Mindpath</div>
                <div className={styles.accountInfo}>
                    <span><strong>FEX:</strong> {account.fex.toFixed(2)}</span>
                    <span><strong>SU:</strong> {account.su}</span>
                </div>
            </header>
            <main className={styles.coPilotLog} ref={logRef}>
                {messages.map((msg, i) => <div key={i} className={msg.sender === 'user' ? styles.userMsg : styles.pilotMsg}>{msg.text}</div>)}
            </main>
            <form className={styles.inputArea} onSubmit={handleSubmit}>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Speak your truth..." className={styles.input} />
                <button type="submit" className={styles.anchorButton}>Anchor</button>
            </form>
        </div>
    );
}
