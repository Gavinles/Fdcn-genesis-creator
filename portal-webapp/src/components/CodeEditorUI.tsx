import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism-tomorrow.css';

export type Language = 'javascript' | 'python' | 'css' | 'bash';

interface CodeEditorUIProps {
  initialCode?: string;
  initialLanguage?: Language;
  onChange?: (code: string) => void;
}

const languageMap: Record<Language, any> = {
  javascript: languages.javascript,
  python: languages.python,
  css: languages.css,
  bash: languages.bash,
};

const CodeEditorUI: React.FC<CodeEditorUIProps> = ({
  initialCode = '',
  initialLanguage = 'javascript',
  onChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Sync local state with prop changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const highlightCode = (code: string) => {
    try {
      return highlight(code, languageMap[language], language);
    } catch (err) {
      console.error('Syntax highlighting error:', err);
      return code;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      backgroundColor: '#1e1e1e',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      {/* Language Selector */}
      <div style={{
        padding: '8px 12px',
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #3e3e3e',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <label style={{ color: '#ccc', fontSize: '12px', fontWeight: 'bold' }}>
          Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{
            padding: '4px 8px',
            backgroundColor: '#3e3e3e',
            color: '#fff',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="bash">Shell</option>
        </select>
      </div>

      {/* Code Editor */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={highlightCode}
          padding={16}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#1e1e1e',
            minHeight: '100%',
            color: '#d4d4d4'
          }}
          textareaClassName="code-editor-textarea"
        />
      </div>
    </div>
  );
};

export default CodeEditorUI;
