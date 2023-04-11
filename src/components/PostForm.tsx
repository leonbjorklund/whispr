import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

const PostForm: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const postTextInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (postTextInputRef.current) {
      postTextInputRef.current.style.height = "auto";
      postTextInputRef.current.style.height = `${postTextInputRef.current.scrollHeight}px`;
    }
  }, [inputText]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const submitButton = e.currentTarget.form?.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement | null;
      submitButton?.click();
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledPostText
        rows={1}
        maxLength={280}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={postTextInputRef} // Add a ref to the text area
        placeholder="Whats on your mind?"
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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(22, 22, 23);
  border: 1px solid #ffffff2e;
  border-radius: 10px;
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
  margin-left: 5px;
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
  padding: 10px;

  &:hover {
    background-color: rgb(63 63 73);
  }

  &:active {
    transform: scale(0.9);
    box-shadow: 0 0 5px black;
  }
`;

export default PostForm;
