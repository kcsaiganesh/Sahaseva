import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './Components/Layout';
import Login from './Components/LoginFrom';
import Register from './Components/RegisterFrom';
import Home from './Views/Home';
import Shoppinghome from './Views/shoppinghome';
import PostPage from './Views/Post';
import NotFoundPage from './Components/NotFound';
import ProductDetailPage from './Views/serviceDetails';
import Profilecreation from './Views/Profilecreation';
import AdminDashboard from './Views/Administrator';
import Profile from './Views/Profile';
import OAuth2Callback from './Views/Auth2callback';
import SuccessPage from './Components/Successpage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shophome" element={<Shoppinghome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/oauth2callback" component={<OAuth2Callback />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/profilecreation" element={<Profilecreation />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/successpost' element={<SuccessPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
