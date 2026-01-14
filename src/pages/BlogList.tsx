import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, deleteBlog, setPage } from '../store/slices/blogSlice';
import type { RootState, AppDispatch } from '../store';

const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error, pagination } = useSelector((state: RootState) => state.blog) as any;
  const user = useSelector((state: RootState) => (state.auth as any).user);

  useEffect(() => {
    dispatch(fetchBlogs({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      await dispatch(deleteBlog(id)).unwrap();
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📚 Latest Articles</h1>
        <p>Discover stories from our community</p>
      </div>

      {loading && <div className="loading">Loading articles...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {blogs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1em', color: '#6b7280' }}>No articles yet. Be the first to write one!</p>
        </div>
      )}

      <div className="card-grid">
        {blogs.map((blog: any) => (
          <div key={blog.id} className="card blog-card">
            <div className="blog-card-header">
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-meta">📅 {new Date(blog.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <p className="blog-card-content">{blog.content.substring(0, 150)}...</p>
            <div className="blog-card-actions">
              <Link to={`/edit/${blog.id}`} style={{ 
                display: user?.id === blog.user_id ? 'block' : 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.5em 1em',
                borderRadius: '6px',
                textAlign: 'center',
                flex: 1
              }}>
                Edit
              </Link>
              {user?.id === blog.user_id && (
                <button 
                  onClick={() => handleDelete(blog.id)} 
                  className="btn-danger btn-small"
                  style={{ flex: 1 }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {blogs.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            ← Previous
          </button>
          <span>Page {pagination.page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;