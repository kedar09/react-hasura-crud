import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserList from "../../components/User-List/UserList";
import "./user-page.css";

const UserPage = (props) => {
  const history = useHistory();
  return (
    <div>
      <Card>
        <Card className="cardMargin">
          <UserList />
        </Card>
        <div className="cardMargin">
          <Button
            variant="primary"
            onClick={() => {
              history.push("/add-user");
            }}
          >
            Add New User
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
