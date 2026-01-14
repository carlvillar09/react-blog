import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs, deleteBlog, setPage } from '../store/slices/blogSlice';
import type { RootState, AppDispatch } from '../store';

const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error, pagination } = useSelector((state: RootState) => state.blog);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchBlogs({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await dispatch(deleteBlog(id)).unwrap();
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Blogs</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <p>Created at: {new Date(blog.created_at).toLocaleDateString()}</p>
            {user && blog.user_id === user.id && (
              <div>
                <Link to={`/edit/${blog.id}`}>Edit</Link>
                <button onClick={() => handleDelete(blog.id)} style={{ marginLeft: '1rem' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          Previous
        </button>
        <span> Page {pagination.page} of {totalPages} </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;