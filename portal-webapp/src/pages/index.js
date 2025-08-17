// Full React code for main page (condensed for clarity)
import { useState } from 'react';
const LoginView = ({ onConnect }) => (<div className="login-container"><button onClick={onConnect}>Connect Identity</button></div>);
const Dashboard = ({ account, setAccount }) => {
    const [messages, setMessages] = useState([{ sender: 'pilot', text: 'Welcome.' }]);
    const [input, setInput] = useState('');
    const handleSubmit = async (e) => { e.preventDefault(); if (!input.trim()) return; setMessages(prev => [...prev, { sender: 'user', text: input }]); const text = input; setInput(''); const res = await fetch(`/api/pocc/analyze`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accountId: account.id, text})}); const data = await res.json(); setMessages(prev => [...prev, { sender: 'pilot', text: data.guidance }]);};
    return (<div>{/* UI Components Here */}</div>);
};
export default function Home() { const [account, setAccount] = useState(null); const connectWallet = async () => { const mockId = '0xUserA'; const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; const res = await fetch(`${apiUrl.replace('oracle-ai', 'state-ledger')}/account/${mockId}`); const data = await res.json(); setAccount({ id: mockId, ...data }); }; if (!account) return <LoginView onConnect={connectWallet} />; return <Dashboard account={account} setAccount={setAccount} />; }
