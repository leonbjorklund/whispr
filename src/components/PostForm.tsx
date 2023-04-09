import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

const PostForm: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.trim() !== "") {
      await addDoc(collection(firestore, "posts"), {
        text: inputText,
        createdAt: new Date(),
        likes: 0,
      });
      setInputText("");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledPostText
        rows={1}
        maxLength={280}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Write your post..."
      />
      <StyledSubmit type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </StyledSubmit>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(22, 22, 23);
  border: 1px solid #ffffff2e;
  border-radius: 10px;
  padding: 5px;
`;

const StyledPostText = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: none;
  padding: 0;
  background-color: inherit;
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
  resize: none;
  padding: 10px;
  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  @media (max-width: 580px) {
    // Add a media query for screen width less than 580px
    font-size: 1rem; // Set the font size to 1rem
  }
`;

const StyledSubmit = styled.button`
  height: 100%;
  background-color: inherit;
  color: white;
  border-radius: 10px;
  font-size: 1.2rem;
  width: 50px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(63 63 73);
  }

  &:active {
    transform: scale(0.9);
    box-shadow: 0 0 5px black;
  }
`;

export default PostForm;
