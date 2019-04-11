import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_EVENTS = gql`
  query ALL_EVENTS {
    allEvents {
      createdBy {
        id
        email
      }
      id
      title
    }
  }
`;

const Events = () => {
  return (
    <Query query={ALL_EVENTS}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return data.allEvents.length ? data.allEvents.map(event => <div>{event.title}</div>) : <div>No events were found :(</div>;
      }}
    </Query>
  );
};

export default Events;
