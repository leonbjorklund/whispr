import { FirestoreDataConverter, collection, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IDOptions } from 'react-firebase-hooks/firestore/dist/firestore/types';
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
  const [posts] = useCollectionData<PostData>(postsQuery, { idField: 'id', } as IDOptions<PostData>);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post key={post.id} postId={post.id} text={post.text} likes={post.likes} />
        ))}
    </div>
  );
};

export default PostFeed;
