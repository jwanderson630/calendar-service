import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider, Query } from "react-apollo";
import withData from "../lib/withData";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    loggedInUser {
      id
    }
  }
`;

const UserContext = React.createContext({ userId: "" });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log(ctx);
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Query query={CURRENT_USER_QUERY}>
            {({ data, loading }) => {
              if (loading) return <div>Loading...</div>;
              return (
                <UserContext.Provider value={{ userId: data.loggedInUser.id }}>
                  <Page>
                    <Component {...pageProps} />
                  </Page>
                </UserContext.Provider>
              );
            }}
          </Query>
        </ApolloProvider>
      </Container>
    );
  }
}

export { UserContext };
export default withData(MyApp);
