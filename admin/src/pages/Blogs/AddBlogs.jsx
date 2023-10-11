import TextInput from '../../components/InputFields/TextInput';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import JoditEditor from 'jodit-react'
import { useRef } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios';

const AddBlogs = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const navigate = useNavigate()
  const editor = useRef(null)
  const handleSubmit = async (e) => {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('summary', summary);
    postData.append('content', content);
    postData.append('file', files[0]);
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/blogs', postData, { withCredentials: true })
      if (res.status === 200) {
        toast.success('Blog Added')
      }
      navigate('/blogs')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6 > <Link to='/blogs'> &lt; Back</Link></h6>
        <ul>
          <TextInput type='text' label='Title' required={true} name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextInput type='text' label='summary' required={true} name='summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
          <li>
            <label htmlFor="image">
              <span className="label">
                Images <span className="required-star">*</span>
              </span>
            </label>
            <input type="file" onChange={e => setFiles(e.target.files)} />
          </li>
          <li>
            <label htmlFor="image">
              <span className="label">
                Content <span className="required-star">*</span>
              </span>
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={newContent => setContent(newContent)}
            />
          </li>
          <br />
          <li className='center'>
            <button className="admin-btn">upload Blogs</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default AddBlogs