
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Frontend from './fcomponents/Frontend';
import Login from './fcomponents/Login';
import Signup from './fcomponents/Signup';
import Admin from './fcomponents/Admin';
import Vendorlogin from './fcomponents/Vendorlogin';
import Services from './fcomponents/Services';
import Vendorsignup from './fcomponents/Vendorsignup';
import Forget from './fcomponents/Forget';
import Dashboard from './userdash/Dashboard';
import Photographer from './fcomponents/categories/Photographer';
import Functions from './fcomponents/categories/Functions';
import Caterer from './fcomponents/categories/Caterer';
import { SoundSystem } from './fcomponents/categories/SoundSystem';
import MyUserProfile from './userdash/MyUserProfile'
import Mehandi from './fcomponents/categories/Mehandi';
import WeddingPlanner from './fcomponents/categories/WeddingPlanner';
import Orgdashboard from './organizerdash/Orgdashboard';
import MyOrganizerProfile from './organizerdash/MyOrganizerProfile';
import Orgservices from './organizerdash/Orgservices';
import Vendorforget from './fcomponents/Vendorforget';
import Admindash from './admindash/Admindash';
import AdminUserProfiles from './admindash/AdminUserProfiles';
import AdminVendorProfiles from './admindash/AdminVendorProfiles';
import VendorPhoto from './organizerdash/categories/VendorPhoto';
import VendorCatering from './organizerdash/categories/VendorCatering';
import VendorFunction from './organizerdash/categories/VendorFunction';
import VendorMehandi from './organizerdash/categories/VendorMehandi';
import VendorSound from './organizerdash/categories/VendorSound';
import VendorWedding from './organizerdash/categories/VendorWedding';

function App() {

  const user = localStorage.getItem("token");




  return (
    <>
      <Routes>

        {user && <Route path="/userdash" exact element={<Dashboard />} />}
        {user && <Route path="/my-profile" exact element={<MyUserProfile />} />}

        {user && <Route path="/organizer" exact element={<Orgdashboard />} />}
        {user && <Route path="/my-vendor-profile" exact element={<MyOrganizerProfile />} />}
        {user && <Route path="/vendorservices" exact element={<Orgservices />} />}
        {user && <Route path="/admindash" exact element={<Admindash />} />}
        {user && <Route path="/all-signed-users" exact element={<AdminUserProfiles />} />}
        {user && <Route path="/all-signed-vendors" exact element={<AdminVendorProfiles />} />}



        
        {user &&<Route path="/vendor-photographers" element={<VendorPhoto/>} />}
       {user && <Route path="/vendor-function-halls" element={<VendorFunction/>} />}
        {user && <Route path="/vendor-caterers" element={<VendorCatering/>} />}
        {user && <Route path="/vendor-sound-system" element={<VendorSound/>} />}
        {user && <Route path="/vendor-mehandi" element={<VendorMehandi/>} />}
       { user && <Route path="/vendor-wedding" element={<VendorWedding/>} />}













        <Route path="/" element={<Frontend/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/vendor" element={<Vendorlogin/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/vendorsignup" element={<Vendorsignup/>} />

        <Route path="/forget-password" element={<Forget/>} />
        <Route path="/vendor-forget-password" element={<Vendorforget/>} />




        {/* categories */}

        <Route path="/photographers" element={<Photographer/>} />

        <Route path="/function-halls" element={<Functions/>} />
        <Route path="/caterers" element={<Caterer/>} />
        <Route path="/sound-system" element={<SoundSystem/>} />
        <Route path="/mehandi" element={<Mehandi/>} />
        <Route path="/wedding" element={<WeddingPlanner/>} />






        





      </Routes>
    </>
  );
}

export default App;
