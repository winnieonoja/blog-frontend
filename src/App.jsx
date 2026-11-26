import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import ErrorPage from './pages/error_page';
import CreateAccount from './pages/create_account';
import Login from './pages/login';
import Profile from './pages/profile';
import SinglePost from './pages/single_post';
import CreatePost from './pages/create_post';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from "./pages/admin/ManageUsers";
// import ManagePosts from "./pages/admin/ManagePosts";
import ManageComments from "./pages/admin/ManageComments";
import ManagePosts from './pages/admin/ManagePosts';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/create_account" element={<CreateAccount  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/post/:id"  element={<SinglePost />} />
        <Route path="/create_post" element={<CreatePost/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
       <Route path="/admin/posts" element={<ManagePosts />} />

<Route
  path="/admin/comments"
  element={<ManageComments />}
/> 

       
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}



 export default App

function AdminPlaceholder({ title }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        {title} Management
      </h2>

      <p className="mt-3 text-gray-500">
        This section will be developed next.
      </p>

    </div>
  );
}