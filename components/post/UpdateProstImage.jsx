import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { deletePostImg } from "../../features/slice/post/postSlice";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./styles/updatePostimg.module.scss";
import { toast } from "react-toastify";

const UpdateProstImage = ({ img, post }) => {
  const auth = useSelector((state) => state.auth?.user);
  const datas = auth?.data;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleRemoveImg = async (img_id) => {
    console.log(img_id);
    try {
      let data = JSON.stringify({
        img_id,
      });

      let config = {
        method: "delete",
        url:
          "https://companion-api.vercel.app/api/posts/remove-img/" +
          post._id,
        headers: {
          Authorization: `Bearer ${datas?.userToken}`,
          "Content-Type": "application/json",
        },
        data,
      };
      setLoading(true);

      axios(config)
        .then(function (response) {
          if (response?.data) {
            console.log(response.data);
            dispatch(
              deletePostImg({
                id: post._id,
                img_id,
              })
            );

            toast.success(response?.data?.message, {
              toastId: "success1",
            });
          }
        })
        .catch(function (error) {
          toast.error(error?.response?.data?.msg, {
            toastId: "error1",
          });
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div key={img?.img_id} className={Styles.img_wrapper}>
      <img src={img?.img} width="100px" />
      <IconButton className={Styles.icon} onClick={() => handleRemoveImg(img?.img_id)} >
        <CloseOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default UpdateProstImage;
