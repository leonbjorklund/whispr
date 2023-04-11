import React from 'react';
import Logo from './components/Logo';
import PostFeed from './components/PostFeed';
import PostForm from './components/PostForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Logo />
      <PostForm />
      <PostFeed />
    </div>
  );
};

export default App;