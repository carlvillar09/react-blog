import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBlog } from '../store/slices/blogSlice';
import type { RootState, AppDispatch } from '../store';

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [id, blogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await dispatch(updateBlog({ id, title, content })).unwrap();
      navigate('/');
    } catch (err) {
      // Error handled in slice
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditBlog;