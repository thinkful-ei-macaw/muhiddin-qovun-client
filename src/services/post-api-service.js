import TokenService from "../services/token-service";
import config from "../config";

const PostApiService = {
  // GET all posts including current user's posts
  getPosts() {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // GET a specific post
  getPost(post_id) {
    return fetch(`${config.API_ENDPOINT}/posts/${post_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // UPDATE a specific post

  editPost(title, section, content, post_id) {
    return fetch(`${config.API_ENDPOINT}/posts/${post_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        section,
        content,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // DELETE a specific post
  deletePost(post_id) {
    return fetch(`${config.API_ENDPOINT}/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // GET current user's posts
  getUserPosts() {
    return fetch(`${config.API_ENDPOINT}/user-posts`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  // POST a new post
  postPost(title, section, content) {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        section,
        content,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PostApiService;
