import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../store/slices/blogSlice';
import type { RootState, AppDispatch } from '../store';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.blog) as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createBlog({ title, content })).unwrap();
      navigate('/');
    } catch (err) {
      // Error handled in slice
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header">
          <h1>✍️ Write a New Article</h1>
          <p>Share your thoughts and stories with the world</p>
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
              {loading ? 'Publishing...' : '✨ Publish Article'}
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

export default CreateBlog;