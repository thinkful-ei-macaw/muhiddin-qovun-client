import React from 'react'
import ReactDOM from 'react-dom'
import { PostListProvider } from './contexts/PostListContext';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './components/App/App'
import './index.css'
import { PostProvider } from './contexts/PostContext';


ReactDOM.render(
  <BrowserRouter>
    <PostListProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </PostListProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
