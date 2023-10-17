import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setCurrentUser } from "../redux/User/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//* ------------- this custom hook is only for  login ,  resetPassword ,and changeMYPassword --------------------

function useFetch(url, method, body = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async (url, method, body = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data: body,
      });

      setData(response.data);

      dispatch(setCurrentUser(response.data.user));
      toast.success(response?.data?.status);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fetchData };
}

export default useFetch;
