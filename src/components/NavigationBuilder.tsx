import React, { useState } from 'react';
import { NavigationItem } from '../types/navigation';
import { generateId } from '../utils/navigationUtils';
import NavigationItemComponent from './NavigationItemComponent';
import AddItemPanel from './AddItemPanel';

interface NavigationBuilderProps {
  items: NavigationItem[];
  setItems: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
  validationErrors: string[];
}

const NavigationBuilder: React.FC<NavigationBuilderProps> = ({
  items,
  setItems,
  validationErrors
}) => {
  const [showAddPanel, setShowAddPanel] = useState(false);

  const addItem = (type: NavigationItem['type'], data: any) => {
    const newItem: NavigationItem = {
      id: generateId(),
      type,
      data,
      children: [],
      parentId: undefined
    };

    setItems(prev => [...prev, newItem]);
    setShowAddPanel(false);
  };

  const updateItem = (id: string, updates: Partial<NavigationItem>) => {
    setItems(prev => {
      const updateItemRecursive = (items: NavigationItem[]): NavigationItem[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, ...updates };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: updateItemRecursive(item.children)
            };
          }
          return item;
        });
      };
      
      return updateItemRecursive(prev);
    });
  };

  const deleteItem = (id: string) => {
    setItems(prev => {
      const deleteItemRecursive = (items: NavigationItem[]): NavigationItem[] => {
        return items.filter(item => {
          if (item.id === id) {
            return false;
          }
          if (item.children && item.children.length > 0) {
            item.children = deleteItemRecursive(item.children);
          }
          return true;
        });
      };
      
      return deleteItemRecursive(prev);
    });
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    setItems(prev => {
      const moveItemRecursive = (items: NavigationItem[]): NavigationItem[] => {
        // First, find the parent array containing the item
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === id) {
            // Item is at this level
            if (direction === 'up' && i > 0) {
              const newItems = [...items];
              [newItems[i], newItems[i - 1]] = [newItems[i - 1], newItems[i]];
              return newItems;
            } else if (direction === 'down' && i < items.length - 1) {
              const newItems = [...items];
              [newItems[i], newItems[i + 1]] = [newItems[i + 1], newItems[i]];
              return newItems;
            }
            return items;
          }
          
          // Check children recursively
          const currentItem = items[i];
          if (currentItem.children && currentItem.children.length > 0) {
            const updatedChildren = moveItemRecursive(currentItem.children);
            if (updatedChildren !== currentItem.children) {
              return items.map((item, index) => 
                index === i ? { ...item, children: updatedChildren } : item
              );
            }
          }
        }
        return items;
      };
      
      return moveItemRecursive(prev);
    });
  };

  const duplicateItem = (id: string) => {
    setItems(prev => {
      const duplicateItemRecursive = (items: NavigationItem[]): NavigationItem[] => {
        return items.map(item => {
          if (item.id === id) {
            const duplicatedItem: NavigationItem = {
              ...item,
              id: generateId(),
              data: { ...item.data }
            };
            return duplicatedItem;
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: duplicateItemRecursive(item.children)
            };
          }
          return item;
        });
      };
      
      return duplicateItemRecursive(prev);
    });
  };

  const addChildItem = (parentId: string, childType: NavigationItem['type'], childData: any) => {
    const newChild: NavigationItem = {
      id: generateId(),
      type: childType,
      data: childData,
      children: [],
      parentId: parentId
    };
    
    setItems(prev => {
      const addChildRecursive = (items: NavigationItem[]): NavigationItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newChild]
            };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: addChildRecursive(item.children)
            };
          }
          return item;
        });
      };
      
      return addChildRecursive(prev);
    });
  };

  // Separate tabs from other navigation items
  const tabs = items.filter(item => item.type === 'tab');
  const otherItems = items.filter(item => item.type !== 'tab');

  return (
    <div className="w-full">
      {/* Header with Add Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Navigation Structure</h2>
            <p className="text-sm text-gray-500">
              Build your navigation visually. Tabs appear at the top, other items in the sidebar.
            </p>
          </div>
          <button
            onClick={() => setShowAddPanel(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Navigation Validation Errors
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Tabs Section - Full Width */}
      {tabs.length > 0 && (
        <div className="w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <span className="text-lg mr-2">📑</span>
              Top Navigation Tabs
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              These tabs appear horizontally at the top of your documentation
            </p>
          </div>
          <div className="w-full">
            <div className="flex flex-nowrap gap-1 w-full overflow-x-auto">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="flex-shrink-0">
                  <NavigationItemComponent
                    item={tab}
                    index={index}
                    totalItems={tabs.length}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                    onMove={moveItem}
                    onDuplicate={duplicateItem}
                    onAddChild={(childType: NavigationItem['type'], childData: any) => {
                      addChildItem(tab.id, childType, childData);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <span className="text-lg mr-2">📚</span>
              Sidebar Navigation
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              These items appear in the left sidebar of your documentation
            </p>
          </div>
          <div className="p-4">
            {otherItems.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sidebar navigation items</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding pages, groups, anchors, or other navigation elements.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setShowAddPanel(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {otherItems.map((item, index) => (
                  <NavigationItemComponent
                    key={item.id}
                    item={item}
                    index={index}
                    totalItems={otherItems.length}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                    onMove={moveItem}
                    onDuplicate={duplicateItem}
                    onAddChild={(childType: NavigationItem['type'], childData: any) => {
                      addChildItem(item.id, childType, childData);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Item Panel */}
      {showAddPanel && (
        <AddItemPanel
          onAdd={addItem}
          onClose={() => setShowAddPanel(false)}
        />
      )}
    </div>
  );
};

export default NavigationBuilder;
