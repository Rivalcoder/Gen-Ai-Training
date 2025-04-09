import { useState } from 'react';
import '../app/globals.css';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [records, setRecords] = useState([]);

  const insertData = async () => {
    const res = await fetch('/api/airtable/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    alert('Data inserted!');
    console.log(data);
  };

  const fetchData = async () => {
    const res = await fetch('/api/airtable/fetch');
    const data = await res.json();
    setRecords(data);
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Airtable Data Entry</h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={insertData}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Insert Data
        </button>

        <button
          onClick={fetchData}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Fetch Data
        </button>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Fetched Records:</h2>
        <ul className="bg-white p-4 rounded shadow space-y-2">
          {records.map((record) => (
            <li key={record.id} className="border-b last:border-none pb-2">
              <strong>{record.fields?.Name}</strong> - {record.fields?.Email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
