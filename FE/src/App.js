import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';


import './App.css';
import Login from './pages/Login';
import User from './pages/UserPage';
import Header from './comp/Header';
import BookDetail from './pages/BookDetail';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import BookDetailADMIN from './pages/BookDetailADMIN';

function App() {
  return (
    <>

      <Header />
      <div className="App relative h-screen flex justify-center m-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ADMIN" element={<AdminPage />} />
          <Route path="/USER" element={<User />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bookByADMIN/:id" element={<BookDetailADMIN />} />
          {/* <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} /> */}
        </Routes>
      </div>

    </>
  );
}

export default App;
