import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Modal,
  Card,
  Typography,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./style.css";
import AddMemberModal from "components/AddMember";

// const users = ["Amelie", "Philipp", "Johanna", "Ana", "Florian"];

const MeetingForm = () => {
  // const [address, setAddress] = useState("");
  // const [building, setBuilding] = useState("");
  // const [room, setRoom] = useState("");
  // const [date, setDate] = useState(null);
  // const [time, setTime] = useState(null);
  // const [title, setTitle] = useState("");
  // const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  // const [isDateTimeModalOpen, setDateTimeModalOpen] = useState(false);
  // const [isMemberModalOpen, setMemberModalOpen] = useState(false);

  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState("");
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isDateTimeModalOpen, setDateTimeModalOpen] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [members, setMembers] = useState([]);

  const handleAddressSave = () => {
    console.log("closing");
    setAddressModalOpen(false);
  };

  const handleDateTimeSave = () => {
    setDateTimeModalOpen(false);
  };

  const handleSaveMeeting = () => {
    const meetingData = {
      address,
      building,
      room,
      date: date ? dayjs(date).format("YYYY-MM-DD") : null,
      time: time ? dayjs(time).format("HH:mm") : null,
      title,
      members,
    };

    console.log(JSON.stringify(meetingData));

    // Reset all form inputs to initial state
    setAddress("");
    setBuilding("");
    setRoom("");
    setDate(null);
    setTime(null);
    setTitle("");
    setMembers([]);
  };

  const handleMemberSave = (selectedMembers) => {
    setMembers(selectedMembers);
  };

  // const handleDeleteMember = (index) => {
  //   setMembers(members.filter((_, i) => i !== index));
  // };

  // const handleMemberSave = () => {
  //   if (!selectedMember) return;
  //   setMembers([...members, { name: selectedMember, isChecked }]);
  //   setSelectedMember(null);
  //   setIsChecked(false);
  // };

  // const handleCheck = (index) => {
  //   setMembers((prevState) =>
  //     prevState.map((member, i) =>
  //       i === index ? { ...member, isChecked: !member.isChecked } : member
  //     )
  //   );
  // };

  return (
    <div className="meetingParent">
      <Card id="cardParent">
        <Typography variant="h3" gutterBottom>
          Create new meeting
        </Typography>
        <div className="meeting-form">
          <div className="form-group">
            <TextField
              label="Meeting Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Button onClick={() => setAddressModalOpen(true)}>
              Set meeting place
            </Button>
            <Modal
              open={isAddressModalOpen}
              onClose={() => setAddressModalOpen(false)}
              className="modal"
            >
              <div className="modalBody">
                <h2>Place</h2>
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  label="Building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                />
                <TextField
                  label="Room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
                <Button onClick={handleAddressSave}>Save</Button>
              </div>
            </Modal>
          </div>

          <div className="form-group">
            <Button onClick={() => setDateTimeModalOpen(true)}>
              Set date and time
            </Button>
            <Modal
              open={isDateTimeModalOpen}
              onClose={() => setDateTimeModalOpen(false)}
              className="modal"
            >
              <div className="modalBody">
                <h2>Date and Time</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <Button variant="contained" onClick={handleDateTimeSave}>
                  Save
                </Button>
              </div>
            </Modal>
          </div>

          <div className="form-group">
            <Button onClick={() => setMemberModalOpen(true)}>Add Member</Button>
            <AddMemberModal
              isOpen={isMemberModalOpen}
              onClose={() => setMemberModalOpen(false)}
              // users={users}
              onSave={handleMemberSave}
            />
          </div>

          <div className="form-group">
            <Button variant="contained" onClick={handleSaveMeeting}>
              Save Meeting
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeetingForm;
