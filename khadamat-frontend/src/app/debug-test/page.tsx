'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (title: string, data: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = `[${timestamp}] ${title}: \n${JSON.stringify(data, null, 2)}`;
    setLogs((prev) => [...prev, message]);
  };

  useEffect(() => {
    const runTests = async () => {
      // 1. HEALTH
      try {
        const res = await fetch('http://localhost:3000/api/health');
        const data = await res.json().catch(() => ({ status: res.status }));
        addLog('1. HEALTH CHECK', data);
      } catch (e: any) {
        addLog('1. ERROR', e.message);
      }

      // 2. CITIES
      try {
        const res = await fetch('http://localhost:3000/api/locations/cities');
        const data = await res.json();
        addLog('2. CITIES', { count: data.length });
      } catch (e: any) {
        addLog('2. ERROR', e.message);
      }

      // 3. SIGNUP (SANS CITY ID !)
      const email = `debug${Math.floor(Math.random() * 1000)}@test.com`;
      let token = '';

      try {
        addLog('3. SIGNUP', `Tentative avec ${email}`);
        const res = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password: 'Password123!',
            firstName: 'Debug',
            lastName: 'User',
            phone: '+212600000000',
            role: 'CLIENT',
            // PAS DE CITY ID ICI
          }),
        });
        const data = await res.json();
        addLog('3. RESULTAT SIGNUP', { status: res.status, data });
      } catch (e: any) {
        addLog('3. ERROR', e.message);
      }

      // 4. LOGIN
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: 'Password123!' }),
        });
        const data = await res.json();
        if (data.accessToken) token = data.accessToken;
        addLog('4. LOGIN', { success: !!data.accessToken });
      } catch (e: any) {
        addLog('4. ERROR', e.message);
      }

      // 5. SEARCH (Avec Token)
      if (token) {
        try {
          const res = await fetch('http://localhost:3000/api/pro?city=Casablanca', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const text = await res.text();
          addLog('5. SEARCH', text.substring(0, 100));
        } catch (e: any) {
          addLog('5. ERROR', e.message);
        }
      } else {
        addLog('5. SEARCH', 'Skipped (No Token)');
      }
    };

    runTests();
  }, []);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Debug Diagnostics</h1>
      <p className="text-sm text-gray-600">Tests automatiques vers http://localhost:3000</p>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap break-words text-sm">
          {logs.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </pre>
      </div>
    </main>
  );
}
