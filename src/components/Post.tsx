import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/compat";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

interface PostProps {
  postId: string;
  text: string;
  likes: number;
  createdAt: firebase.firestore.Timestamp;
  postNumber: number;
}

const Post: React.FC<PostProps> = ({
  postId,
  text,
  likes,
  createdAt,
  postNumber,
}) => {
  const handleLike = async () => {
    if (postId) {
      await updateDoc(doc(collection(firestore, "posts"), postId), {
        likes: likes + 1,
      });
    } else {
      console.error("Error: postId is empty.");
    }
  };

  const handleRemove = async () => {
    if (postId) {
      await deleteDoc(doc(collection(firestore, "posts"), postId));
    } else {
      console.error("Error: postId is empty.");
    }
  };

  const postDate = createdAt.toDate();
  const formattedDate = postDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <StyledPostCard>
      <PostHeader>
        <PostData>#{postNumber}</PostData>
        <PostData>{formattedDate}</PostData>
      </PostHeader>
      <PostText>{text}</PostText>
      <PostFooter>
        <div>
          <LikeButton onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} />
            <LikesAmount>{likes}</LikesAmount>
          </LikeButton>
        </div>
        <button
          onClick={handleRemove}
          style={{
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          Remove
        </button>
      </PostFooter>
    </StyledPostCard>
  );
};

export default Post;

export const StyledPostCard = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #161617;
  border: 1px solid #ffffff2e;
  border-radius: 10px;
  color: white;
  margin: 10px;
  gap: 10px;
`;

export const PostText = styled.div`
  word-wrap: break-word;
  text-align: left;
  font-weight: 500;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 0.9em;
`;

export const PostData = styled.div`
  position: relative;
  word-wrap: break-word;
  font-size: 0.75rem;
  text-decoration: underline;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 10px;
  padding-right: 10px;

  &:hover {
    background-color: rgb(63 63 73);
  }
`;

const LikesAmount = styled.span`
margin-left: 5px;
`
const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

