import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabase';

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    limit: number;
  };
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    total: 0,
    limit: 10,
  },
};

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { blogs: data, total: count || 0, page, limit };
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async ({ title, content }: { title: string; content: string }) => {
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, content }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, title, content }: { id: string; title: string; content: string }) => {
    const { data, error } = await supabase
      .from('blogs')
      .update({ title, content })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;
    return id;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.pagination = {
          page: action.payload.page,
          total: action.payload.total,
          limit: action.payload.limit,
        };
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blogs';
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create blog';
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update blog';
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete blog';
      });
  },
});

export const { setPage, clearError } = blogSlice.actions;
export default blogSlice.reducer;