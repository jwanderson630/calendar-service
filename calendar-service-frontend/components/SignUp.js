import { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={{ email, password }}>
      {(signUp, { loading, error }) => (
        <div>
          <h2>Sign Up</h2>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const user = await signUp();
            }}
            disabled={loading}
            aria-busy={loading}
          >
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
            <button type="submit">Sign up</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default SignUp;
