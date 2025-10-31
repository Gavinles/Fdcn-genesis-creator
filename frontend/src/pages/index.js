import { useState, useEffect } from 'react';
import Head from 'next/head';
import CoPilot from '../components/CoPilot';
import { io } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5008';

export default function Home() {
    const [account, setAccount] = useState(null);
    const [socket, setSocket] = useState(null);

    const connect = () => {
        const mockAccount = { id: '0xUserJulia' };
        
        const newSocket = io(BACKEND_URL);

        newSocket.on('connect', () => {
            console.log("Connected to backend");
            newSocket.emit('join', { accountId: mockAccount.id });
        });

        newSocket.on('state_update', (data) => {
            setAccount(prev => ({ ...(prev || mockAccount), ...data }));
        });

        setSocket(newSocket);
    };

    if (!account) {
        return (
            <div className="login-container">
                <Head><title>Mindpath - Connect</title></Head>
                <div className="login-box">
                    <h1>Mindpath</h1>
                    <p>Take ownership of your mental health.</p>
                    <button onClick={connect}>Begin Your Journey</button>
                </div>
            </div>
        );
    }

    return <CoPilot account={account} socket={socket} />;
}
