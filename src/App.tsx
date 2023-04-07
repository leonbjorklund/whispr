import React from 'react';
import './App.css';
import PostFeed from './components/PostFeed';
import PostForm from './components/PostForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React Posts App</h1>
      <PostForm />
      <PostFeed />
    </div>
  );
};

export default App;