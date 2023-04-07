import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../firebase';

const PostForm: React.FC = () => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      await addDoc(collection(firestore, 'posts'), {
        text: inputText,
        createdAt: new Date(),
        likes: 0,
      });
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Write your post..."
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
