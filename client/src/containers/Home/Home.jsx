import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// import { Button } from "reactstrap";

import AddEvent from "../../components/AddEvent/AddEvent.jsx";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import TableBody from "../../components/TableBody/TableBody.jsx";

const Home = () => {
  const { jwt } = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [dateItems, setDateItems] = useState([]);
  const [event, setEvent] = useState("Select");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    getTableInfo();
  }, []);

  const getTableInfo = async() => {
    try {
      const { data } = await API.getEvents(jwt);
      console.log(data);
      setDateItems(data.info);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    setModal(!modal);
    setTimeout(() => {
      setPage(0);
    }, 500);
  };

  const handleSelectEvent = (e) => {
    setEvent(e.target.value);
  };

  const handleNextPage = async () => {
    const newPage = page + 1;
    if (newPage === 2) {
      try {
        const { data } = await API.addEvent(
          jwt,
          "",
          event,
          name,
          reminders,
          date.toISOString(),
          0
        );
        console.log(data);
        handleToggle();
        getTableInfo();
      } catch (err) {
        console.log(err);
      }
    } else {
      setPage(newPage);
    }
  };

  const handleAddReminder = (e) => {
    const daysBefore = parseInt(e.target.value);
    if (!reminders.includes(daysBefore)) {
      setReminders([...reminders, daysBefore]);
    } else {
      const newReminders = reminders;
      setReminders([...newReminders.filter((item) => item !== daysBefore)]);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Container>
      <Row>
        <h1>This is the home page</h1>
        <AddEvent
          handleToggle={handleToggle}
          modal={modal}
          handleSelectEvent={handleSelectEvent}
          setDate={setDate}
          date={date}
          event={event}
          page={page}
          handleNextPage={handleNextPage}
          handleAddReminder={handleAddReminder}
          handleNameChange={handleNameChange}
          name={name}
        />
      </Row>
      <Row>
        <Col xs="12" md="6">
          <h2>Birthdays</h2>
          <TableBody name="Name" type="Birthday" dateItems={dateItems} />
        </Col>
        <Col xs="12" md="6">
          <h2>Holidays</h2>
          <TableBody name="Name" type="Holiday" dateItems={dateItems} />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <h2>Other</h2>
          <TableBody name="Name" type="Other" dateItems={dateItems} />
        </Col>
        <Col xs="12" md="6">
          <h2>Cancel Subscriptions</h2>
          <TableBody
            name="Service"
            type="Cancel Subscription"
            dateItems={dateItems}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
