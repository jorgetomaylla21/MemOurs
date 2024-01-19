import React from 'react';
// src/components/RichTextEditor.tsx
import ReactQuill, { Quill as QuillType } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import 'react-quill/dist/quill.bubble.css'; // Import the styles
import 'react-quill/dist/quill.core.css'; // Import the styles
//import './RichTextEditor.css'; // Create your own styles

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image', 'video',
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string): void => {
    onChange(content);
  };

  return (
    <ReactQuill
      theme="snow" // or 'bubble'
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      style={{ height: "300px" }}
    />
  );
};

export default RichTextEditor;
