import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import PrivateRoute from "../Utils/PrivateRoute";
import HomePage from "../HomePage/HomePage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PostListPage from "../../routes/PostListPage/PostListPage";
import PostPage from "../../routes/PostPage/PostPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import PostForm from "../../routes/PostForm/PostForm";
import EditPost from "../../routes/EditPost/EditPost";
import HomePageAfterLogin from "../../routes/HomePageAfterLogin/HomePageAfterLogin";
import UserPosts from "../../routes/UserPosts/UserPosts";
import "./App.css";

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header />
        </header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <Route exact path={"/"} component={HomePage} />
            <PrivateRoute exact path={"/home"} component={HomePageAfterLogin} />
            <Route exact path={"/view/:section"} component={PostListPage} />
            <PublicOnlyRoute exact path={"/login"} component={LoginPage} />
            <PrivateRoute exact path={"/add-post"} component={PostForm} />
            <PrivateRoute
              exact
              path={"/posts/edit/:post_id"}
              component={EditPost}
            />
            <PrivateRoute exact path={"/myposts"} component={UserPosts} />
            <PublicOnlyRoute
              exact
              path={"/register"}
              component={RegistrationPage}
            />
            <Route exact path={"/posts/:post_id"} component={PostPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
