import React, { useState } from "react";
import PostList from "../component/PostsList/index";
import Post from "../component/Post/index";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [editObj, setEditObj] = useState({
    userId: 0,
    title: "",
    body: "",
    id: 0,
  });
  const [postList, setPostList] = useState([]);

  return (
    <div className="App">
      <PostList
        setIsOpen={setIsOpen}
        setEditObj={setEditObj}
        setPostList={setPostList}
        postList={postList}
      />
      <Post
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        editObj={editObj}
        setEditObj={setEditObj}
        setPostList={setPostList}
        postList={postList}
      />
    </div>
  );
}

export default Home;
