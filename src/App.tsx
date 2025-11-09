import { useState } from "react";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          My First Encryption App
        </h1>
        <AsciiShifter />
      </div>
    </div>
  );
};

const AsciiShifter = () => {
  const [text, setText] = useState(""); // Holds the input text for encryption
  const [encryptStepNumber, setEncryptStepNumber] = useState<number>(0); // Holds the step number for encryption
  const [encryptedText, setEncryptedText] = useState(""); // Holds the encrypted text for decryption
  const [decryptStepNumber, setDecryptStepNumber] = useState<number>(0); // Holds the step number for decryption

  // Automatically handle encryption when text or step number changes
  const handleEncryption = (inputText: string, step: number) => {
    return inputText
      .split("")
      .map((char) => {
        if (char.match(/[a-zA-Z]/)) {
          const base = char === char.toLowerCase() ? 97 : 65; // ASCII value for 'a' or 'A'
          return String.fromCharCode(
            ((char.charCodeAt(0) - base + (step % 26)) % 26) + base
          );
        }
        return char; // Leave non-alphabetic characters as is
      })
      .join("");
  };

  // Automatically handle decryption when encrypted text or step number changes
  const handleDecryption = (inputText: string, step: number) => {
    return inputText
      .split("")
      .map((char) => {
        if (char.match(/[a-zA-Z]/)) {
          const base = char === char.toLowerCase() ? 97 : 65; // ASCII value for 'a' or 'A'
          return String.fromCharCode(
            ((char.charCodeAt(0) - base - (step % 26) + 26) % 26) + base
          );
        }
        return char; // Leave non-alphabetic characters as is
      })
      .join("");
  };

  // Derived values for encryption and decryption
  const encryptedResult = handleEncryption(text, encryptStepNumber);
  const decryptedResult = handleDecryption(encryptedText, decryptStepNumber);

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex space-x-6">
      {/* Encryption Section */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Encryption</h2>
        <div className="mb-4">
          <label
            htmlFor="textInput"
            className="block text-sm font-medium text-gray-700"
          >
            Input Text
          </label>
          <input
            id="textInput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter text here"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="encryptStepInput"
            className="block text-sm font-medium text-gray-700"
          >
            Step Number
          </label>
          <input
            id="encryptStepInput"
            type="number"
            value={encryptStepNumber}
            onChange={(e) => setEncryptStepNumber(Number(e.target.value) || 0)} // Ensure encryptStepNumber is always a number
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter step number"
          />
        </div>
        <div className="mt-4 relative">
          <h3 className="text-md font-semibold text-gray-800">
            Encrypted Result
          </h3>
          <div className="mt-2 p-4 bg-gray-100 rounded-md border border-gray-300 relative">
            <button
              onClick={() => copyToClipboard(encryptedResult)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              📋
            </button>
            {encryptedResult || "The encrypted text will appear here"}
          </div>
        </div>
      </div>

      {/* Decryption Section */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Decryption</h2>
        <div className="mb-4">
          <label
            htmlFor="encryptedInput"
            className="block text-sm font-medium text-gray-700"
          >
            Encrypted Text
          </label>
          <input
            id="encryptedInput"
            type="text"
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter encrypted text here"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="decryptStepInput"
            className="block text-sm font-medium text-gray-700"
          >
            Step Number
          </label>
          <input
            id="decryptStepInput"
            type="number"
            value={decryptStepNumber}
            onChange={(e) => setDecryptStepNumber(Number(e.target.value) || 0)} // Ensure decryptStepNumber is always a number
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter step number"
          />
        </div>
        <div className="mt-4 relative">
          <h3 className="text-md font-semibold text-gray-800">
            Decrypted Result
          </h3>
          <div className="mt-2 p-4 bg-gray-100 rounded-md border border-gray-300 relative">
            <button
              onClick={() => copyToClipboard(decryptedResult)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              title="Copy to clipboard"
            >
              📋
            </button>
            {decryptedResult || "The original text will appear here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
