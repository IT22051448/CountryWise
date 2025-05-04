import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import Contact from './pages/contact/ContactUs';
import CountryPage from './pages/country/Country';
import GlobalView from './pages/globe/GlobalView';
import AboutUs from './pages/about/AboutUs';
import Layout from './layout/Layout';
import Collection from './pages/collection/Collection';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastProvider } from './hooks/ToastContext';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/countries" element={<CountryPage />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/globe-view" element={<GlobalView />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </Provider>
  );
};

export default App;
