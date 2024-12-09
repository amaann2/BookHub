import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { baseurl } from "../../config"
import './myreview.css'
const MyReviews = () => {
  const [myReview, setMyreview] = useState([])
  useEffect(() => {
    const getMyReview = async () => {
      try {
        const { data } = await axios.get('/api/v1/review/userReview/all', { withCredentials: true })
        setMyreview(data)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    getMyReview()
  }, [])
  console.log(myReview)
  return (
    <div>
      <h1 className="purple title">My Review</h1>
      {myReview && myReview?.review?.map((r) => (
        <>
          <div className="myreview-box">
            <div className="image-container">

              <img src={`${baseurl}/${r?.book?.image}`} alt="" className="myreview-image" />
            </div>
            <div className="content-container">

              <h3>{r?.book?.title}</h3>
              <p>{r?.comment} - ({r?.rating})</p>
              <p>{r?.createdAt.slice(0, 10)}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default MyReviews