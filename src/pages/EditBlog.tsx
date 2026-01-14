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
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog) as any;

  useEffect(() => {
    const blog = blogs.find((b: any) => b.id === id);
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
    <div className="page-container">
      <div className="form-container">
        <div className="page-header">
          <h1>✏️ Edit Article</h1>
          <p>Update your article content</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter your article title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your article content here..."
              rows={10}
              style={{ minHeight: '300px' }}
            />
          </div>
          <div className="btn-group">
            <button type="submit" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Updating...' : '💾 Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              style={{ 
                flex: 1, 
                backgroundColor: '#6b7280',
                color: 'white'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;