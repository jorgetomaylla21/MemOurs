import React, { useState, ChangeEvent } from 'react';

interface TextEditorProps {
  initialText?: string;
}

const Editor: React.FC<TextEditorProps> = ({ initialText = '' }) => {
  const [text, setText] = useState<string>(initialText);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h2>Text Editor</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows={10}
        cols={30}
        placeholder="Type your text here..."
      />
      <div>
        <strong>Preview:</strong>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Editor;
