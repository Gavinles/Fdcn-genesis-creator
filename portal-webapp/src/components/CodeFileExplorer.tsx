import React, { useState } from 'react';
import CodeEditorUI, { Language } from './CodeEditorUI';
import CosePanel from './CosePanel';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  language?: Language;
  content?: string;
  children?: FileNode[];
}

interface CodeFileExplorerProps {
  initialFiles?: FileNode[];
  onFileLoad?: (path: string) => Promise<string>;
  onFileSave?: (path: string, content: string) => Promise<void>;
}

// Sample file tree structure - ready to be replaced with backend data
const defaultFileTree: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'index.js',
        type: 'file',
        language: 'javascript',
        content: '// Sample JavaScript code\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
      },
      {
        name: 'utils.py',
        type: 'file',
        language: 'python',
        content: '# Sample Python code\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))',
      },
      {
        name: 'styles.css',
        type: 'file',
        language: 'css',
        content: '/* Sample CSS code */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n  background-color: #1e1e1e;\n  color: #d4d4d4;\n}',
      },
    ],
  },
  {
    name: 'scripts',
    type: 'folder',
    children: [
      {
        name: 'deploy.sh',
        type: 'file',
        language: 'bash',
        content: '#!/bin/bash\n# Sample Shell script\necho "Starting deployment..."\nnpm run build\necho "Deployment complete!"',
      },
    ],
  },
];

const CodeFileExplorer: React.FC<CodeFileExplorerProps> = ({
  initialFiles = defaultFileTree,
  onFileLoad,
  onFileSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'scripts']));
  const [showCosePanel, setShowCosePanel] = useState(true);

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = async (file: FileNode, path: string) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      
      // Try to load from backend first, fall back to default content
      if (onFileLoad) {
        try {
          const content = await onFileLoad(path);
          setFileContent(content);
        } catch (error) {
          console.error('Error loading file:', error);
          setFileContent(file.content || '');
        }
      } else {
        setFileContent(file.content || '');
      }
    }
  };

  const handleCodeChange = (newCode: string) => {
    setFileContent(newCode);
    // Optionally auto-save or provide save button
  };

  const handleSave = async () => {
    if (selectedFile && onFileSave) {
      try {
        await onFileSave(selectedFile.name, fileContent);
        alert('File saved successfully!');
      } catch (error) {
        alert('Error saving file: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0, parentPath = '') => {
    return nodes.map((node, index) => {
      const nodePath = parentPath ? `${parentPath}/${node.name}` : node.name;
      const isExpanded = expandedFolders.has(nodePath);
      const isSelected = selectedFile?.name === node.name;

      if (node.type === 'folder') {
        return (
          <div key={`${nodePath}-${index}`}>
            <div
              onClick={() => toggleFolder(nodePath)}
              style={{
                padding: '6px 8px',
                paddingLeft: `${8 + depth * 16}px`,
                cursor: 'pointer',
                color: '#ccc',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                userSelect: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d2d2d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>{isExpanded ? '▼' : '▶'}</span>
              <span>📁 {node.name}</span>
            </div>
            {isExpanded && node.children && (
              <div>{renderFileTree(node.children, depth + 1, nodePath)}</div>
            )}
          </div>
        );
      } else {
        const icon = node.language === 'javascript' ? '📄' :
                     node.language === 'python' ? '🐍' :
                     node.language === 'css' ? '🎨' :
                     node.language === 'bash' ? '⚙️' : '📄';

        return (
          <div
            key={`${nodePath}-${index}`}
            onClick={() => handleFileSelect(node, nodePath)}
            style={{
              padding: '6px 8px',
              paddingLeft: `${8 + depth * 16}px`,
              cursor: 'pointer',
              color: isSelected ? '#fff' : '#ccc',
              backgroundColor: isSelected ? '#37373d' : 'transparent',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = '#2d2d2d';
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span>{icon}</span>
            <span>{node.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* File Tree Panel */}
      <div style={{
        width: '250px',
        backgroundColor: '#252526',
        borderRight: '1px solid #3e3e3e',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '12px',
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid #3e3e3e',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#fff'
        }}>
          File Explorer
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {renderFileTree(initialFiles)}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{
          padding: '8px 12px',
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid #3e3e3e',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '13px', color: '#ccc' }}>
            {selectedFile ? (
              <span>📝 {selectedFile.name}</span>
            ) : (
              <span style={{ color: '#888' }}>Select a file to edit</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {onFileSave && selectedFile && (
              <button
                onClick={handleSave}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#007acc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Save
              </button>
            )}
            <button
              onClick={() => setShowCosePanel(!showCosePanel)}
              style={{
                padding: '4px 12px',
                backgroundColor: showCosePanel ? '#555' : '#007acc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {showCosePanel ? 'Hide COSE' : 'Show COSE'}
            </button>
          </div>
        </div>

        {/* Editor and COSE Panel Container */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Code Editor */}
          <div style={{ flex: showCosePanel ? 1 : 2, minWidth: 0 }}>
            {selectedFile ? (
              <CodeEditorUI
                initialCode={fileContent}
                initialLanguage={selectedFile.language || 'javascript'}
                onChange={handleCodeChange}
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#888',
                fontSize: '14px'
              }}>
                Select a file from the explorer to start editing
              </div>
            )}
          </div>

          {/* COSE Panel */}
          {showCosePanel && (
            <div style={{
              width: '350px',
              borderLeft: '1px solid #3e3e3e',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CosePanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeFileExplorer;
