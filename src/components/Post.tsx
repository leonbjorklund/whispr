import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';

interface PostProps {
  postId: string;
  text: string;
  likes: number;
}

const Post: React.FC<PostProps> = ({ postId, text, likes }) => {
  const handleLike = async () => {
    if (postId) {
      await updateDoc(doc(collection(firestore, 'posts'), postId), {
        likes: likes + 1,
      });
    } else {
      console.error('Error: postId is empty.');
    }
  };

  const handleRemove = async () => {
    if (postId) {
      await deleteDoc(doc(collection(firestore, 'posts'), postId));
    } else {
      console.error('Error: postId is empty.');
    }
  };

  return (
    <StyledPostCard>
      <p>{text}</p>
      <div>
        <button onClick={handleLike}>Like</button>
        <span>{likes}</span>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </StyledPostCard>
  );
};

export default Post;

export const StyledPostCard = styled.div`
  height: 100%;
  padding: 10px;
  background-color: #161617;
  border: 1px solid #ffffff2e;
  border-radius: 10px;
  color: white;
  margin: 10px;
`;
