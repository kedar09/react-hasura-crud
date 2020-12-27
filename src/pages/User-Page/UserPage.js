import React from "react";
import { Link } from "react-router-dom";
// import AddUser from "../../components/Add-User/AddUser";
import UserList from "../../components/User-List/UserList";
import "./user-page.css";

const UserPage = () => {
  // const [loading, setLoading] = useState(false);
  return (
    <div className="divUserPage">
      <div>
        <Link to="/add-user">Add User</Link>
        <UserList />
      </div>
    </div>
  );
};

export default UserPage;
