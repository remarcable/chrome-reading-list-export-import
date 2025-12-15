import { useState } from "react";
import "./App.css";
import {
  exportReadingList,
  importReadingList,
  deleteAllEntries,
} from "./lib/readingList";

function App() {
  const [message, setMessage] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const handleExport = async () => {
    setMessage("");
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
      setMessage("Please select a file to import.");
      return;
    }

    const confirmed = window.confirm(
      "Importing a reading list will add entries to your existing list. " +
        "Duplicates will not be created based on URL. " +
        "Are you sure you want to proceed?"
    );
    if (!confirmed) {
      return;
    }
    setMessage("");
    setProgress(0);

    const resultMessage = await importReadingList(importFile, setProgress);
    setMessage(resultMessage);
    setProgress(null);
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all entries? This action cannot be undone. " +
        "Please make sure you have exported your reading list first, as importing will not restore the exact same state (e.g. creation dates)."
    );
    if (confirmed) {
      setMessage("");
      setProgress(null);
      const resultMessage = await deleteAllEntries();
      setMessage(resultMessage);
    }
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
          <button onClick={handleExport} className="button">
            Export Reading List
          </button>
        </section>
        <section className="card">
          <h2>Import</h2>
          <p>Import a reading list from a JSON file.</p>
          <input type="file" accept=".json" onChange={handleFileChange} />

          <button
            onClick={handleImport}
            disabled={!importFile}
            className="button"
          >
            Import Reading List
          </button>

          {progress !== null && (
            <div className="progress-bar-container">
              <progress value={progress} max="100" />
              <span>{Math.round(progress)}%</span>
            </div>
          )}
        </section>
        <section className="card danger-zone">
          <h2>Danger Zone</h2>
          <p>
            Delete all items from your reading list. This action cannot be
            undone.
          </p>
          <button onClick={handleDeleteAll} className="button">
            Delete All
          </button>
        </section>
        {message && <p className="message">{message}</p>}
      </main>
    </div>
  );
}

export default App;
