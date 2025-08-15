import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { NavigationConfig } from '../types/navigation';

interface JsonEditorProps {
  onImport: (jsonString: string) => void;
  currentConfig: NavigationConfig;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onImport, currentConfig }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Update the JSON input when currentConfig changes
    const jsonString = JSON.stringify(currentConfig, null, 2);
    setJsonInput(jsonString);
  }, [currentConfig]);

  const validateJson = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      setIsValidJson(true);
      setErrorMessage('');
      return true;
    } catch (error) {
      setIsValidJson(false);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON');
      return false;
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const jsonString = value || '';
    setJsonInput(jsonString);
    validateJson(jsonString);
  };

  const handleImport = () => {
    if (validateJson(jsonInput)) {
      onImport(jsonInput);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
      validateJson(content);
    };
    reader.readAsText(file);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setJsonInput(text);
      validateJson(text);
    }).catch((err) => {
      console.error('Failed to read clipboard:', err);
    });
  };

  const handleClear = () => {
    setJsonInput('');
    setIsValidJson(true);
    setErrorMessage('');
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonInput(formatted);
      setIsValidJson(true);
      setErrorMessage('');
    } catch (error) {
      setIsValidJson(false);
      setErrorMessage('Cannot format invalid JSON');
    }
  };

  const sampleConfig: NavigationConfig = {
    groups: [
      {
        group: "Getting Started",
        icon: "play",
        pages: [
          "overview",
          "quickstart",
          {
            group: "Installation",
            icon: "download",
            pages: [
              "installation/requirements",
              "installation/setup"
            ]
          }
        ]
      },
      {
        group: "API Reference",
        icon: "code",
        tag: "NEW",
        pages: [
          "api/authentication",
          "api/endpoints",
          "api/errors"
        ]
      }
    ],
    tabs: [
      {
        tab: "Documentation",
        icon: "book-open",
        pages: [
          "docs/guide",
          "docs/examples"
        ]
      },
      {
        tab: "Blog",
        icon: "newspaper",
        href: "https://example.com/blog"
      }
    ]
  };

  const loadSample = () => {
    const sampleJson = JSON.stringify(sampleConfig, null, 2);
    setJsonInput(sampleJson);
    setIsValidJson(true);
    setErrorMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">JSON Editor</h2>
        <p className="text-sm text-gray-500">
          Import existing navigation configurations or edit JSON directly. Paste from clipboard, upload files, or use the sample configuration.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={loadSample}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Load Sample
        </button>
        <button
          onClick={handlePaste}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Paste from Clipboard
        </button>
        <label className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          Upload File
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={handleFormat}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Format JSON
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear
        </button>
      </div>

      {/* Monaco Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Navigation Configuration JSON
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="json"
            value={jsonInput}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              fontSize: 14,
              tabSize: 2,
              automaticLayout: true,
              wordWrap: 'on',
              folding: true,
              foldingStrategy: 'indentation',
              showFoldingControls: 'always',
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              glyphMargin: true,
              renderLineHighlight: 'all',
              selectOnLineNumbers: true,
              theme: 'vs-light'
            }}
          />
        </div>
        {!isValidJson && errorMessage && (
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      {/* Import Button */}
      <div className="flex justify-end">
        <button
          onClick={handleImport}
          disabled={!isValidJson || !jsonInput.trim()}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isValidJson && jsonInput.trim()
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Import Configuration
        </button>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              JSON Format Help
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Your JSON should follow the Mintlify navigation structure. You can include:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><strong>pages</strong>: Array of page paths</li>
                <li><strong>groups</strong>: Nested groups with pages</li>
                <li><strong>tabs</strong>: Tab navigation with optional external URLs</li>
                <li><strong>anchors</strong>: Top-level navigation anchors</li>
                <li><strong>dropdowns</strong>: Dropdown menus</li>
                <li><strong>versions</strong>: Version-specific navigation</li>
                <li><strong>languages</strong>: Language-specific navigation</li>
              </ul>
              <p className="mt-2">
                <strong>Note:</strong> Avoid using paths containing "/api" or "/mcp" as they are reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
