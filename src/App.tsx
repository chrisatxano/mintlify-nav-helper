import React, { useState } from 'react';
import { NavigationConfig, NavigationItem } from './types/navigation';
import { convertToNavigationItems, convertToNavigationConfig, validateNavigationConfig } from './utils/navigationUtils';
import NavigationBuilder from './components/NavigationBuilder';
import JsonEditor from './components/JsonEditor';
import './App.css';

function App() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [activeTab, setActiveTab] = useState<'builder' | 'json'>('builder');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleImportJson = (jsonString: string) => {
    try {
      const config: NavigationConfig = JSON.parse(jsonString);
      const items = convertToNavigationItems(config);
      setNavigationItems(items);
      setActiveTab('builder');
      
      // Validate the imported configuration
      const validation = validateNavigationConfig(config);
      setValidationErrors(validation.errors);
      
      if (!validation.isValid) {
        console.warn('Navigation validation warnings:', validation.errors);
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handleExportJson = () => {
    const config = convertToNavigationConfig(navigationItems);
    const jsonString = JSON.stringify(config, null, 2);
    
    // Create and download the file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mintlify-navigation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleValidation = () => {
    const config = convertToNavigationConfig(navigationItems);
    const validation = validateNavigationConfig(config);
    setValidationErrors(validation.errors);
    
    if (validation.isValid) {
      alert('Navigation configuration is valid! ✅');
    } else {
      alert(`Navigation configuration has ${validation.errors.length} validation error(s). Check the console for details.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Mintlify Navigation Builder
              </h1>
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Visual Builder
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleValidation}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Validate
              </button>
              <button
                onClick={handleExportJson}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('builder')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'builder'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visual Builder
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'json'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              JSON Editor
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full py-8">
        {activeTab === 'builder' ? (
          <NavigationBuilder
            items={navigationItems}
            setItems={setNavigationItems}
            validationErrors={validationErrors}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <JsonEditor
              onImport={handleImportJson}
              currentConfig={convertToNavigationConfig(navigationItems)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built for Mintlify documentation sites. Create beautiful navigation structures visually.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Tabs, anchors, and dropdowns appear at the top • Pages, groups, versions, and languages appear in the sidebar
            </p>
            <p className="mt-2">
              <a
                href="https://mintlify.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500"
              >
                View Mintlify Documentation
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
