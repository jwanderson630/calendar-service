import { useContext } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { UserContext } from "./_app";

const Home = props => {
  const user = useContext(UserContext);
  return (
    <div>
      {user.userId}
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Home;
