import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import moment from "moment";

import TableRow from "../TableRow/TableRow.jsx";

const formatDate = (momentDate, type) => {
  if (type === "Holiday") {
    return momentDate.format("MMMM Do");
  } else {
    return momentDate.format("MMMM Do YYYY");
  }
};

const daysToString = (daysAway) => {
  if (!daysAway) {
    return "today!";
  } else if (daysAway < 0) {
    return "past";
  } else {
    return daysAway.toString();
  }
};

const TableBody = ({ name, dateItems, eventType }) => {

  dateItems.sort((a, b) => a.days_away - b.days_away);

  return (
    <Table hover >
      <thead>
        <tr>
          <th>Days Away</th>
          <th>{name}</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {dateItems.map(({ days_away, date, type, name }, index) => {
          if (type === eventType) {
            const momentDate = moment(date);
            return (
              <TableRow
                key={`${index + 1}`}
                date={formatDate(momentDate, type)}
                name={name}
                daysAway={daysToString(days_away)}
              />
            );
          }
        })}
      </tbody>
    </Table>
  );
};

TableBody.propTypes = {
  name: PropTypes.string,
  dateItems: PropTypes.array,
  eventType: PropTypes.string,
};

export default TableBody;