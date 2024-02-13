import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { postAPI, putAPI } from "../../redux/services/service";
import { toast } from "react-toastify";

const Post = (props) => {
  const { setIsOpen, isOpen, editObj, setPostList, postList, setEditObj } =
    props;

  const [value, setValue] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (editObj.title) {
      setValue(editObj.title);
    }
  }, [editObj.title]);

  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setEditObj({ userId: 0, title: "", body: "", id: 0 });
  };

  const putRequest = async () => {
    const newObj = { ...editObj, title: value };
    try {
      const postRes = await putAPI(newObj);
      if (postRes.data) {
        const finIndex = postList.findIndex(
          (item) => item.id === postRes.data.id
        );
        postList[finIndex] = postRes.data;
        const updatedList = [...postList];
        setPostList(updatedList);
        toast.success("Post Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong" || error);
    }
  };

  const postRequest = async () => {
    try {
      const post = {
        title: value,
        body: "",
        userId: 1,
      };
      const postRes = await postAPI(post);
      if (postRes.data) {
        postList.splice(0, 0, postRes.data);
        const updatedList = [...postList];
        setPostList(updatedList);
        toast.success("Post Added Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong" || error);
    }
  };

  const onSubmit = async () => {
    setLoader(true);

    if (value.trim().length === 0) {
      toast.error("Title cannot be empty");
    } else {
      if (editObj.title) {
        await putRequest();
      } else {
        await postRequest();
      }
      handleClose();
    }

    setLoader(false);
  };

  return (
    <>
      <Modal show={isOpen} animation={true}>
        <Modal.Header className="modal-header">
          <Modal.Title className="mx-auto">
            {editObj.title ? "Edit Post" : "Add New Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Post Title</label>
            <div className="input-group mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                name="name"
                data-testid="title-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Post title"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loader} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="add-btn"
            disabled={loader}
            variant="primary"
            onClick={onSubmit}
          >
            {loader ? <Spinner color="primary" size="sm" /> : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
