import React, { useState, useContext } from "react";
// import { Button } from "reactstrap";

import AddEvent from "../../components/AddEvent/AddEvent.jsx";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";

const Home = () => {
  const { jwt } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState("Select");
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [reminders, setReminders] = useState([]);
  const [name, setName] = useState("");

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
        const {data} = await API.addEvent(jwt, "", event, name, reminders, date, 0);
        console.log(data);
        handleToggle();
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
    <div>
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
    </div>
  );
};

export default Home;
