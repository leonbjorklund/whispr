import { FirestoreDataConverter, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import { firestore } from '../firebase';
import Post from './Post';

interface PostData {
  id: string;
  text: string;
  likes: number;
}

const postDataConverter: FirestoreDataConverter<PostData> = {
  toFirestore: (data: PostData) => {
    return {
      id: data.id,
      text: data.text,
      likes: data.likes,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      text: data.text,
      likes: data.likes,
    } as PostData;
  },
};

const PostFeed: React.FC = () => {
  const postsQuery = query(
    collection(firestore, 'posts').withConverter(postDataConverter),
    orderBy('createdAt', 'desc')
  );

  const [posts, setPosts] = React.useState<PostData[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const fetchedPosts: PostData[] = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data() as PostData;
        fetchedPosts.push({ ...postData, id: doc.id });
      });
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <StyledFeed>
      {posts &&
        posts.map((post) => (
          <Post key={post.id} postId={post.id} text={post.text} likes={post.likes} />
        ))}
    </StyledFeed>
  );
};

export default PostFeed;

const StyledFeed = styled.div`
width: 80%;
margin-left: auto;
margin-right: auto;
`