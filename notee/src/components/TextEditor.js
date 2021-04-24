import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
if (!SERVER_URL) throw new Error('Environment variables is not set yet.');

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean']
];

const TextEditor = () => {
  const { noteId } = useParams();

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // === Setting up Socket.io
  useEffect(() => {
    const socket = io(SERVER_URL);
    setSocket(socket);
    return () => socket.disconnect();
  }, []);

  // === Creating Notes Room
  useEffect(() => {
    if (!socket || !quill) return;
    socket.emit('get-note', noteId);
    socket.once('load-note', note => {
      quill.setContents(note);
      quill.enable();
    });
  }, [socket, quill, noteId]);

  // === Sending & Receiving Realtime Data
  useEffect(() => {
    if (!socket || !quill) return;
    const handleQuill = (delta, _oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handleQuill);
    const handleSocket = delta => quill.updateContents(delta);
    socket.on('receive-changes', handleSocket);
    return () => {
      quill.off('text-change', handleQuill);
      socket.off('receive-changes', handleSocket);
    };
  }, [socket, quill]);

  // === Saving Documents
  useEffect(() => {
    if (!socket || !quill) return;
    quill.on('text-change', () => socket.emit('save-note', quill.getContents()));
  });

  const textEditorWrapperRef = useCallback(textEditorWrapper => {
    if (!textEditorWrapper) return;
    textEditorWrapper.innerHTML = '';
    const textEditor = document.createElement('div');
    textEditorWrapper.append(textEditor);
    const quill = new Quill(textEditor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
    quill.disable();
    quill.setText('Loading...');
    setQuill(quill);
  }, []);

  return <div className="text-editor" ref={textEditorWrapperRef}></div>;
};

export default TextEditor;
