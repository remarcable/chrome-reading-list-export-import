import { useState } from 'react';
import './App.css';
import { exportReadingList, importReadingList } from './lib/readingList';

function App() {
  const [message, setMessage] = useState('');
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleExport = async () => {
    const resultMessage = await exportReadingList();
    setMessage(resultMessage);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImportFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      setMessage('Please select a file to import.');
      return;
    }
    const resultMessage = await importReadingList(importFile);
    setMessage(resultMessage);
  };

  return (
    <div className="App">
      <header>
        <h1>Reading List Export/Import</h1>
      </header>
      <main>
        <section className="card">
          <h2>Export</h2>
          <p>Export your Chrome reading list to a JSON file.</p>
          <button onClick={handleExport}>Export Reading List</button>
        </section>
        <section className="card">
          <h2>Import</h2>
          <p>Import a reading list from a JSON file.</p>
          <input type="file" accept=".json" onChange={handleFileChange} />
          <button onClick={handleImport} disabled={!importFile}>Import Reading List</button>
        </section>
        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
}

export default App;