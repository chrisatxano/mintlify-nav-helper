import React from 'react';
import { NavigationItem } from '../types/navigation';
import { X } from 'lucide-react';

interface AddItemPanelProps {
  onAdd: (type: NavigationItem['type'], data: any) => void;
  onClose: () => void;
}

const AddItemPanel: React.FC<AddItemPanelProps> = ({ onAdd, onClose }) => {
  const itemTypes = [
    {
      type: 'tab' as const,
      icon: '📑',
      title: 'Tab (Top Navigation)',
      description: 'Horizontal tab at the top of your documentation',
      data: { tab: 'New Tab', pages: [] },
      category: 'top'
    },
    {
      type: 'anchor' as const,
      icon: '🔗',
      title: 'Anchor (Top Navigation)',
      description: 'Top-level navigation anchor with optional icon and external URL',
      data: { anchor: 'New Anchor', pages: [] },
      category: 'top'
    },
    {
      type: 'dropdown' as const,
      icon: '📋',
      title: 'Dropdown (Top Navigation)',
      description: 'Dropdown menu with optional icon and external URL',
      data: { dropdown: 'New Dropdown', pages: [] },
      category: 'top'
    },
    {
      type: 'page' as const,
      icon: '📄',
      title: 'Page (Sidebar)',
      description: 'Simple page link in the sidebar',
      data: { path: 'new-page' },
      category: 'sidebar'
    },
    {
      type: 'group' as const,
      icon: '📁',
      title: 'Group (Sidebar)',
      description: 'Group of pages with optional icon and tag',
      data: { group: 'New Group', pages: [] },
      category: 'sidebar'
    },
    {
      type: 'version' as const,
      icon: '🏷️',
      title: 'Version (Sidebar)',
      description: 'Version-specific navigation structure',
      data: { version: '1.0.0', groups: [] },
      category: 'sidebar'
    },
    {
      type: 'language' as const,
      icon: '🌐',
      title: 'Language (Sidebar)',
      description: 'Language-specific navigation structure',
      data: { language: 'en', groups: [] },
      category: 'sidebar'
    }
  ];

  const topNavigationItems = itemTypes.filter(item => item.category === 'top');
  const sidebarItems = itemTypes.filter(item => item.category === 'sidebar');

  const handleAdd = (type: NavigationItem['type'], data: any) => {
    onAdd(type, data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Add Navigation Item</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Top Navigation Section */}
          <div className="mb-8">
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <span className="text-lg mr-2">📑</span>
              Top Navigation
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              These items appear at the top of your documentation, above the main content area.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topNavigationItems.map((itemType) => (
                <button
                  key={itemType.type}
                  onClick={() => handleAdd(itemType.type, itemType.data)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{itemType.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{itemType.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{itemType.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Navigation Section */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <span className="text-lg mr-2">📚</span>
              Sidebar Navigation
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              These items appear in the left sidebar of your documentation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sidebarItems.map((itemType) => (
                <button
                  key={itemType.type}
                  onClick={() => handleAdd(itemType.type, itemType.data)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{itemType.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{itemType.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{itemType.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemPanel;
