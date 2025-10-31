import React, { useState } from 'react';

interface CosePanelProps {
  onSign?: (data: string) => Promise<string>;
  onVerify?: (data: string, signature: string) => Promise<boolean>;
  onEncrypt?: (data: string) => Promise<string>;
  onDecrypt?: (data: string) => Promise<string>;
}

const CosePanel: React.FC<CosePanelProps> = ({
  onSign,
  onVerify,
  onEncrypt,
  onDecrypt,
}) => {
  const [activeTab, setActiveTab] = useState<'sign' | 'verify' | 'encrypt' | 'decrypt'>('sign');
  const [inputData, setInputData] = useState('');
  const [signatureInput, setSignatureInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOperation = async () => {
    setLoading(true);
    setOutput('');

    try {
      let result = '';

      switch (activeTab) {
        case 'sign':
          if (onSign) {
            result = await onSign(inputData);
          } else {
            // Stub implementation - ready to wire to backend
            result = `[STUB] Signed data: ${btoa(inputData).substring(0, 32)}...`;
          }
          break;

        case 'verify':
          if (onVerify) {
            const isValid = await onVerify(inputData, signatureInput);
            result = isValid ? 'Signature is VALID ✓' : 'Signature is INVALID ✗';
          } else {
            // Stub implementation
            result = `[STUB] Verification result: ${signatureInput.length > 0 ? 'VALID ✓' : 'INVALID ✗'}`;
          }
          break;

        case 'encrypt':
          if (onEncrypt) {
            result = await onEncrypt(inputData);
          } else {
            // Stub implementation
            result = `[STUB] Encrypted: ${btoa(inputData)}`;
          }
          break;

        case 'decrypt':
          if (onDecrypt) {
            result = await onDecrypt(inputData);
          } else {
            // Stub implementation
            try {
              result = `[STUB] Decrypted: ${atob(inputData)}`;
            } catch {
              result = '[STUB] Invalid encrypted data format';
            }
          }
          break;
      }

      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const tabStyle = (isActive: boolean) => ({
    padding: '8px 16px',
    backgroundColor: isActive ? '#2d2d2d' : '#1e1e1e',
    color: isActive ? '#fff' : '#888',
    border: 'none',
    borderBottom: isActive ? '2px solid #007acc' : '2px solid transparent',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#1e1e1e',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px',
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #3e3e3e',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        COSE Cryptography Panel
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#1e1e1e',
        borderBottom: '1px solid #3e3e3e'
      }}>
        <button onClick={() => setActiveTab('sign')} style={tabStyle(activeTab === 'sign')}>
          Sign
        </button>
        <button onClick={() => setActiveTab('verify')} style={tabStyle(activeTab === 'verify')}>
          Verify
        </button>
        <button onClick={() => setActiveTab('encrypt')} style={tabStyle(activeTab === 'encrypt')}>
          Encrypt
        </button>
        <button onClick={() => setActiveTab('decrypt')} style={tabStyle(activeTab === 'decrypt')}>
          Decrypt
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* Input Data */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            color: '#ccc',
            fontSize: '12px',
            marginBottom: '6px',
            fontWeight: 'bold'
          }}>
            Input Data:
          </label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter data to process..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              backgroundColor: '#2d2d2d',
              color: '#d4d4d4',
              border: '1px solid #3e3e3e',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Signature Input (only for verify) */}
        {activeTab === 'verify' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#ccc',
              fontSize: '12px',
              marginBottom: '6px',
              fontWeight: 'bold'
            }}>
              Signature:
            </label>
            <textarea
              value={signatureInput}
              onChange={(e) => setSignatureInput(e.target.value)}
              placeholder="Enter signature to verify..."
              style={{
                width: '100%',
                minHeight: '60px',
                padding: '8px',
                backgroundColor: '#2d2d2d',
                color: '#d4d4d4',
                border: '1px solid #3e3e3e',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px',
                resize: 'vertical'
              }}
            />
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleOperation}
          disabled={loading || !inputData}
          style={{
            padding: '8px 16px',
            backgroundColor: loading || !inputData ? '#555' : '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !inputData ? 'not-allowed' : 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}
        >
          {loading ? 'Processing...' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
        </button>

        {/* Output */}
        {output && (
          <div>
            <label style={{
              display: 'block',
              color: '#ccc',
              fontSize: '12px',
              marginBottom: '6px',
              fontWeight: 'bold'
            }}>
              Output:
            </label>
            <div style={{
              padding: '12px',
              backgroundColor: '#2d2d2d',
              color: '#4ec9b0',
              border: '1px solid #3e3e3e',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap'
            }}>
              {output}
            </div>
          </div>
        )}

        {/* Info */}
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#2d2d30',
          border: '1px solid #3e3e42',
          borderRadius: '4px',
          color: '#888',
          fontSize: '11px'
        }}>
          <strong>Note:</strong> This is a stub implementation. Wire the <code>onSign</code>, <code>onVerify</code>, 
          <code>onEncrypt</code>, and <code>onDecrypt</code> props to backend COSE cryptography services.
        </div>
      </div>
    </div>
  );
};

export default CosePanel;
