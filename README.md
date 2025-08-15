# Mintlify Navigation Builder

A visual, drag-and-drop navigation builder for Mintlify documentation sites. Build complex navigation structures without writing JSON manually.

## Features

- **Visual Navigation Builder**: Create navigation items visually with an intuitive interface
- **JSON Import/Export**: Import existing navigation configurations or export your visual builds
- **Real-time Validation**: Built-in validation to catch common Mintlify navigation issues
- **Comprehensive Support**: Supports all Mintlify navigation types:
  - Pages
  - Groups (with nested groups)
  - Tabs
  - Anchors
  - Dropdowns
  - Versions
  - Languages
- **Icon Selection**: Choose from a wide range of Lucide icons
- **Drag & Drop**: Reorder navigation items easily
- **Live Preview**: See your navigation structure as you build it

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mintlify-nav-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Visual Builder

1. **Add Items**: Click "Add Item" to create new navigation elements
2. **Edit Properties**: Click the edit icon on any item to modify its properties
3. **Nest Items**: Use the "+" button to add child items to groups, tabs, etc.
4. **Reorder**: Use the up/down arrows to reorder items
5. **Duplicate**: Copy existing items with the duplicate button
6. **Delete**: Remove unwanted items with the delete button

### JSON Editor

1. **Import**: Paste JSON, upload files, or use the sample configuration
2. **Edit**: Modify JSON directly in the editor
3. **Validate**: Check for syntax errors and Mintlify-specific issues
4. **Export**: Download your configuration as a JSON file

### Navigation Types

#### Pages
Simple page links with paths like `"overview"` or `"api/endpoints"`

#### Groups
Organize pages into sections with optional icons and tags:
```json
{
  "group": "Getting Started",
  "icon": "play",
  "tag": "NEW",
  "pages": ["overview", "quickstart"]
}
```

#### Tabs
Create tabbed navigation with optional external URLs:
```json
{
  "tab": "API Reference",
  "icon": "code",
  "pages": ["api/auth", "api/users"]
}
```

#### Anchors
Top-level navigation anchors:
```json
{
  "anchor": "Documentation",
  "icon": "book-open",
  "pages": ["guide", "examples"]
}
```

#### Dropdowns
Consolidated dropdown menus:
```json
{
  "dropdown": "Resources",
  "icon": "folder",
  "pages": ["docs", "tutorials"]
}
```

#### Versions
Version-specific navigation structures:
```json
{
  "version": "2.0.0",
  "groups": [
    {
      "group": "Getting Started",
      "pages": ["v2/overview", "v2/quickstart"]
    }
  ]
}
```

#### Languages
Multi-language navigation support:
```json
{
  "language": "es",
  "groups": [
    {
      "group": "Comenzando",
      "pages": ["es/overview", "es/quickstart"]
    }
  ]
}
```

## Validation

The builder includes comprehensive validation for:
- JSON syntax
- Reserved path detection (`/api`, `/mcp`)
- Required field validation
- Structure consistency

## Export

Your navigation configuration can be exported as a JSON file that's ready to use in your Mintlify `docs.json`:

```json
{
  "navigation": {
    "groups": [
      {
        "group": "Getting Started",
        "icon": "play",
        "pages": ["overview", "quickstart"]
      }
    ]
  }
}
```

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── NavigationBuilder.tsx
│   ├── NavigationItemComponent.tsx
│   ├── AddItemPanel.tsx
│   └── JsonEditor.tsx
├── types/              # TypeScript type definitions
│   └── navigation.ts
├── utils/              # Utility functions
│   └── navigationUtils.ts
├── data/               # Static data
│   └── icons.ts
└── App.tsx             # Main application component
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Create React App** - Build tooling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the [Mintlify documentation](https://mintlify.com/docs)
- Review the validation errors in the builder
- Check the browser console for detailed error messages

## Roadmap

- [ ] Drag and drop reordering
- [ ] Preview mode showing actual navigation
- [ ] Template library
- [ ] Collaboration features
- [ ] Advanced validation rules
- [ ] Import from existing Mintlify sites
