import React, { useState, useEffect } from 'react';

type FontSize = 'small' | 'medium' | 'large';

const FontSizeControl: React.FC = () => {
  const [fontSize, setFontSize] = useState<FontSize>('medium');

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('fontSize') as FontSize;
    if (saved && ['small', 'medium', 'large'].includes(saved)) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const applyFontSize = (size: FontSize) => {
    const root = document.documentElement;
    
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
    }
  };

  const handleChange = (size: FontSize) => {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem('fontSize', size);
  };

  return (
    <div className="font-size-control" role="group" aria-label="Font size adjustment">
      <span className="font-size-label">Font size:</span>
      <div className="font-size-buttons">
        <button
          className={`font-size-btn ${fontSize === 'small' ? 'active' : ''}`}
          onClick={() => handleChange('small')}
          aria-label="Small font size"
          aria-pressed={fontSize === 'small'}
        >
          A
        </button>
        <button
          className={`font-size-btn ${fontSize === 'medium' ? 'active' : ''}`}
          onClick={() => handleChange('medium')}
          aria-label="Medium font size"
          aria-pressed={fontSize === 'medium'}
        >
          A
        </button>
        <button
          className={`font-size-btn large ${fontSize === 'large' ? 'active' : ''}`}
          onClick={() => handleChange('large')}
          aria-label="Large font size"
          aria-pressed={fontSize === 'large'}
        >
          A
        </button>
      </div>
    </div>
  );
};

export default FontSizeControl;
