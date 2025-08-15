import React, { useState } from 'react';
import { NavigationItem } from '../types/navigation';
import { ChevronDown, ChevronRight, Edit, Trash2, Copy, ChevronUp, ChevronDown as ChevronDownIcon, Plus } from 'lucide-react';

interface NavigationItemComponentProps {
  item: NavigationItem;
  index: number;
  totalItems: number;
  onUpdate: (id: string, updates: Partial<NavigationItem>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onDuplicate: (id: string) => void;
  onAddChild: (type: NavigationItem['type'], data: any) => void;
}

const NavigationItemComponent: React.FC<NavigationItemComponentProps> = ({
  item,
  index,
  totalItems,
  onUpdate,
  onDelete,
  onMove,
  onDuplicate,
  onAddChild
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);

  const getItemTitle = () => {
    switch (item.type) {
      case 'page':
        return (item.data as any).path || 'Untitled Page';
      case 'group':
        return (item.data as any).group || 'Untitled Group';
      case 'tab':
        return (item.data as any).tab || 'Untitled Tab';
      case 'anchor':
        return (item.data as any).anchor || 'Untitled Anchor';
      case 'dropdown':
        return (item.data as any).dropdown || 'Untitled Dropdown';
      case 'version':
        return (item.data as any).version || 'Untitled Version';
      case 'language':
        return (item.data as any).language || 'Untitled Language';
      default:
        return 'Untitled Item';
    }
  };

  const getItemIcon = () => {
    switch (item.type) {
      case 'page':
        return '📄';
      case 'group':
        return '📁';
      case 'tab':
        return '📑';
      case 'anchor':
        return '🔗';
      case 'dropdown':
        return '📋';
      case 'version':
        return '🏷️';
      case 'language':
        return '🌐';
      default:
        return '❓';
    }
  };

  const handleUpdate = (field: string, value: any) => {
    onUpdate(item.id, {
      data: {
        ...item.data,
        [field]: value
      }
    });
  };

  const renderEditForm = () => {
    switch (item.type) {
      case 'page':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Page Path</label>
              <input
                type="text"
                value={(item.data as any).path || ''}
                onChange={(e) => handleUpdate('path', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., overview, quickstart"
              />
            </div>
          </div>
        );

      case 'group':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Group Name</label>
              <input
                type="text"
                value={(item.data as any).group || ''}
                onChange={(e) => handleUpdate('group', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Getting Started"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={(item.data as any).icon || ''}
                onChange={(e) => handleUpdate('icon', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">No Icon</option>
                <option value="book-open">Book Open</option>
                <option value="code">Code</option>
                <option value="play">Play</option>
                <option value="pencil">Pencil</option>
                <option value="square-terminal">Terminal</option>
                <option value="newspaper">Newspaper</option>
                <option value="rocket">Rocket</option>
                <option value="house">House</option>
                <option value="notebook-text">Notebook</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tag (Optional)</label>
              <input
                type="text"
                value={(item.data as any).tag || ''}
                onChange={(e) => handleUpdate('tag', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., NEW, BETA"
              />
            </div>
          </div>
        );

      case 'tab':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tab Name</label>
              <input
                type="text"
                value={(item.data as any).tab || ''}
                onChange={(e) => handleUpdate('tab', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., API References"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={(item.data as any).icon || ''}
                onChange={(e) => handleUpdate('icon', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">No Icon</option>
                <option value="book-open">Book Open</option>
                <option value="code">Code</option>
                <option value="play">Play</option>
                <option value="pencil">Pencil</option>
                <option value="square-terminal">Terminal</option>
                <option value="newspaper">Newspaper</option>
                <option value="rocket">Rocket</option>
                <option value="house">House</option>
                <option value="notebook-text">Notebook</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">External URL (Optional)</label>
              <input
                type="url"
                value={(item.data as any).href || ''}
                onChange={(e) => handleUpdate('href', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
        );

      case 'anchor':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Anchor Name</label>
              <input
                type="text"
                value={(item.data as any).anchor || ''}
                onChange={(e) => handleUpdate('anchor', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Documentation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={(item.data as any).icon || ''}
                onChange={(e) => handleUpdate('icon', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">No Icon</option>
                <option value="book-open">Book Open</option>
                <option value="code">Code</option>
                <option value="play">Play</option>
                <option value="pencil">Pencil</option>
                <option value="square-terminal">Terminal</option>
                <option value="newspaper">Newspaper</option>
                <option value="rocket">Rocket</option>
                <option value="house">House</option>
                <option value="notebook-text">Notebook</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">External URL (Optional)</label>
              <input
                type="url"
                value={(item.data as any).href || ''}
                onChange={(e) => handleUpdate('href', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
        );

      case 'dropdown':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dropdown Name</label>
              <input
                type="text"
                value={(item.data as any).dropdown || ''}
                onChange={(e) => handleUpdate('dropdown', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Documentation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={(item.data as any).icon || ''}
                onChange={(e) => handleUpdate('icon', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">No Icon</option>
                <option value="book-open">Book Open</option>
                <option value="code">Code</option>
                <option value="play">Play</option>
                <option value="pencil">Pencil</option>
                <option value="square-terminal">Terminal</option>
                <option value="newspaper">Newspaper</option>
                <option value="rocket">Rocket</option>
                <option value="house">House</option>
                <option value="notebook-text">Notebook</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">External URL (Optional)</label>
              <input
                type="url"
                value={(item.data as any).href || ''}
                onChange={(e) => handleUpdate('href', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
        );

      case 'version':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Version</label>
              <input
                type="text"
                value={(item.data as any).version || ''}
                onChange={(e) => handleUpdate('version', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., 1.0.0"
              />
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language Code</label>
              <select
                value={(item.data as any).language || ''}
                onChange={(e) => handleUpdate('language', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Language</option>
                <option value="en">English (en)</option>
                <option value="es">Spanish (es)</option>
                <option value="fr">French (fr)</option>
                <option value="de">German (de)</option>
                <option value="it">Italian (it)</option>
                <option value="pt-BR">Portuguese (pt-BR)</option>
                <option value="ru">Russian (ru)</option>
                <option value="ja">Japanese (ja)</option>
                <option value="ko">Korean (ko)</option>
                <option value="zh">Chinese (zh)</option>
                <option value="ar">Arabic (ar)</option>
                <option value="tr">Turkish (tr)</option>
                <option value="id">Indonesian (id)</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Use reduced padding for tabs to make them more compact and horizontal
  const isTab = item.type === 'tab';
  const containerPadding = isTab ? 'px-3 py-2' : 'px-4 py-3';
  const headerPadding = isTab ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${isTab ? 'h-fit' : 'w-full'}`}>
      {/* Item Header */}
      <div className={`${headerPadding} flex items-center justify-between ${isTab ? 'min-h-[40px]' : ''}`}>
        <div className="flex items-center space-x-2">
          {/* Expand/Collapse Button */}
          {item.children && item.children.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Item Icon */}
          <span className="text-lg">{getItemIcon()}</span>

          {/* Item Title */}
          <div className="flex items-center space-x-2">
            <span className={`font-medium text-gray-900 ${isTab ? 'text-sm' : 'text-sm'}`}>{getItemTitle()}</span>
            {'tag' in item.data && item.data.tag && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {item.data.tag}
              </span>
            )}
            {'href' in item.data && item.data.href && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                External
              </span>
            )}
          </div>

          {/* Type Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {item.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          {/* Add Child Button */}
          {item.type !== 'page' && (
            <button
              onClick={() => setShowAddChild(!showAddChild)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Add Child Item"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Edit Item"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Duplicate Button */}
          <button
            onClick={() => onDuplicate(item.id)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Duplicate Item"
          >
            <Copy className="h-4 w-4" />
          </button>

          {/* Move Up Button */}
          {index > 0 && (
            <button
              onClick={() => onMove(item.id, 'up')}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Move Up"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          )}

          {/* Move Down Button */}
          {index < totalItems - 1 && (
            <button
              onClick={() => onMove(item.id, 'down')}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Move Down"
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(item.id)}
            className="p-1 text-red-400 hover:text-red-600"
            title="Delete Item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className={`${containerPadding} border-t border-gray-200`}>
          <div className="pt-3">
            {renderEditForm()}
            <div className="mt-3 flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Child Panel */}
      {showAddChild && (
        <div className={`${containerPadding} border-t border-gray-200`}>
          <div className="pt-3">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Add Child Item</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onAddChild('page', { path: 'new-page' });
                  setShowAddChild(false);
                }}
                className="p-3 text-left border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="text-lg">📄</div>
                <div className="text-sm font-medium text-gray-900">Page</div>
                <div className="text-xs text-gray-500">Simple page link</div>
              </button>
              <button
                onClick={() => {
                  onAddChild('group', { group: 'New Group', pages: [] });
                  setShowAddChild(false);
                }}
                className="p-3 text-left border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="text-lg">📁</div>
                <div className="text-sm font-medium text-gray-900">Group</div>
                <div className="text-xs text-gray-500">Group of pages</div>
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setShowAddChild(false)}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Children */}
      {isExpanded && item.children && item.children.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="pl-6 pr-2 py-2 space-y-2">
            {item.children.map((child, childIndex) => (
              <NavigationItemComponent
                key={child.id}
                item={child}
                index={childIndex}
                totalItems={item.children!.length}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onMove={onMove}
                onDuplicate={onDuplicate}
                onAddChild={onAddChild}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationItemComponent;
