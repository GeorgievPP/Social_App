import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:7077" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// FETCH POST
export const fetchPost = (id) => API.get(`/posts/${id}`);

// FETCH POSTS
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// FETCH POSTS BY SEARCH
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

// CREATE POST
export const createPost = (newPost) => API.post("/posts", newPost);

// LIKE POST
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// COMMENT POST
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

// UPDATE POST
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

// DELETE POST
export const deletePost = (id) => API.delete(`/posts/${id}`);

// LOGIN USER
export const signIn = (formData) => API.post("/user/login", formData);

// REGISTER USER
export const signUp = (formData) => API.post("/user/register", formData);
