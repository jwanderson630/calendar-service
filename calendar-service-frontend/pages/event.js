import { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const EVENT_QUERY = gql`
  query EVENT_QUERY($id: String!) {
    allDay
    description
    endTime
    id
    location
    startTime
    timezone
    title
    updatedAt
  }
`;

const Event = () => {
  return (
    <Query query={EVENT_QUERY}>
      {({ data, loadin, error }) => (
        <form>
          <input type="text" />
          <textarea />
          <select name="timezone" id="" />
        </form>
      )}
    </Query>
  );
};

export default Event;
