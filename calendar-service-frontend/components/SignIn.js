import { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Mutation mutation={SIGNIN_MUTATION} variables={{ email, password }}>
      {(signin, { loading, error }) => (
        <div>
          <h2>Sign In</h2>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const {
                data: { authenticateUser },
              } = await signin();
              localStorage.setItem("token", authenticateUser.token);
            }}
            disabled={loading}
            aria-busy={loading}
          >
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
            <button type="submit">Sign in</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default SignIn;
