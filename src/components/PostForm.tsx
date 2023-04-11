import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, firestore } from "../firebase";

const PostForm: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const postTextInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const handleClose = () => {
    setTimeRemaining(null);
  };

  useEffect(() => {
    if (postTextInputRef.current) {
      postTextInputRef.current.style.height = "auto";
      postTextInputRef.current.style.height = `${postTextInputRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const [user] = useAuthState(auth);

  const canPost = async (uid: string) => {
    const currentTime = new Date();
    const thirtyMinutesAgo = new Date(currentTime.getTime() - 30 * 60 * 1000);

    const userPosts = query(
      collection(firestore, "posts"),
      where("uid", "==", uid),
      where("createdAt", ">=", thirtyMinutesAgo)
    );

    const querySnapshot = await getDocs(userPosts);

    // return querySnapshot.empty;

    if (querySnapshot.empty) {
      return null;
    } else {
      const latestPostTime = querySnapshot.docs[0].data().createdAt.toDate();
      const timeElapsed = currentTime.getTime() - latestPostTime.getTime();
      const timeRemaining = 30 * 60 * 1000 - timeElapsed;

      return timeRemaining;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      const remainingTime = await canPost(user.uid);

      if (remainingTime === null) {
        // Your existing code
        if (inputText.trim() !== "") {
          await addDoc(collection(firestore, "posts"), {
            uid: user.uid,
            text: inputText,
            createdAt: new Date(),
            likes: 0,
          });
          setInputText("");
          setTimeRemaining(null);
        }
      } else {
        setTimeRemaining(remainingTime);
      }
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
      {timeRemaining !== null && (
        <PostLimitPopUp>
          <StyledCloseButton onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </StyledCloseButton>
          Only one post per 30 min! <br />
          {Math.ceil(timeRemaining / (1000 * 60))} minutes left
        </PostLimitPopUp>
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative;
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

const PostLimitPopUp = styled.div`
  position: absolute;
  top: 100%;
  left: 90%;
  text-align: left;
  width: 13rem;
  padding: 5px;
  font-size: .9rem;
  z-index: 1;
  transform: translateX(-50%); // to adjust horizontal centering
  background-color: black;
  border: 1px solid white;
  border-radius: 5px; // Add border-radius for a rounded popup
  margin-top: 5px; // Add some margin to create a gap between the form and popup
  color: white; // Set text color to white
  cursor: auto;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 10px;

  &:hover {
    background-color: rgb(63 63 73);
  }
`;

export default PostForm;
