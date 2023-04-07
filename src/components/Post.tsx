import { collection, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../firebase';

interface PostProps {
  postId: string;
  text: string;
  likes: number;
}

const Post: React.FC<PostProps> = ({ postId, text, likes }) => {
  const handleLike = async () => {
    await updateDoc(doc(collection(firestore, 'posts'), postId), {
      likes: likes + 1,
    });
  };

  return (
    <div>
      <p>{text}</p>
      <div>
        <button onClick={handleLike}>Like</button>
        <span>{likes}</span>
      </div>
    </div>
  );
};

export default Post;
