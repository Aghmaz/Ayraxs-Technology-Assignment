import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getPostsAPI, deletePostAPI } from "../../redux/services/service";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const PostList = (props) => {
  const { setIsOpen, setEditObj, postList, setPostList } = props;
  const [loader, setLoader] = useState(false);
  const [editId, setEditId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const editPost = (id) => {
    openModal();
    const filter = postList.filter((item) => item.id === id)[0];
    setEditObj(filter);
  };

  const deletePost = async (id) => {
    setLoader(true);
    setEditId(id);
    try {
      const response = await deletePostAPI(id);
      if (response.data) {
        const filter = postList.filter((item) => item.id !== id);
        setPostList([...filter]);
        toast.success("Post deleted successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setEditId(0);
    setLoader(false);
  };

  const getData = async () => {
    try {
      const response = await getPostsAPI();
      setPostList(response.data);
    } catch (error) {
      setNotification({ msg: "Something went wrong", color: "danger" });
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <h1 className="text-center mb-3">Ayraxs Technologies Assignment</h1>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-6 sm:px-20 bg-white border-b border-gray-200 ">
              <div className="w-[100%] flex  justify-between items-center">
                <div className="text-2xl font-semibold">Latest Posts</div>
                <div>
                  <button
                    className="h-[40px] w-[100px] bg-black text-white rounded-md mr-3"
                    onClick={() => openModal()}
                  >
                    Create Post
                  </button>
                  <button
                    className="h-[40px] w-[100px] bg-black text-white rounded-md"
                    onClick={logout}
                  >
                    logout
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <div className="main mt-3 table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="column1">Title</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postList.slice(0, 10).map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>
                            <span
                              className="pointer"
                              onClick={() => editPost(item.id)}
                            >
                              Edit
                            </span>
                            <span
                              className="pointer ms-3"
                              onClick={() => deletePost(item.id)}
                            >
                              {editId === item.id && loader ? (
                                <Spinner color="danger" size="sm" />
                              ) : (
                                "Delete"
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
