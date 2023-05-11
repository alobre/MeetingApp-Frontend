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

const users = ["Amelie", "Philipp", "Johanna", "Ana", "Florian"];

const MeetingForm = () => {
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isDateTimeModalOpen, setDateTimeModalOpen] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleAddressSave = () => {
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

  const handleDeleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberSave = () => {
    if (!selectedMember) return;
    setMembers([...members, { name: selectedMember, isChecked }]);
    setSelectedMember(null);
    setIsChecked(false);
  };

  const handleCheck = (index) => {
    setMembers((prevState) =>
      prevState.map((member, i) =>
        i === index ? { ...member, isChecked: !member.isChecked } : member
      )
    );
  };

  const AddMemberModal = () => (
    <Modal
      id="addMember"
      open={isMemberModalOpen}
      onClose={() => setMemberModalOpen(false)}
      className="modal"
    >
      <div className="modalBody">
        <h2>Add Member</h2>
        <Autocomplete
          options={users.filter(
            (user) => !members.find((member) => member.name === user)
          )}
          value={selectedMember}
          onChange={(event, newValue) => {
            setSelectedMember(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // label="Select member"
              placeholder="Type to search"
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={(event) => setIsChecked(event.target.checked)}
            />
          }
          label="Can edit agenda"
        />
        <Button onClick={handleMemberSave}>Add Member</Button>

        <div className="form-group">
          {members.map((member, index) => (
            <div key={member.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={member.isChecked}
                    onChange={() => handleCheck(index)}
                  />
                }
                label={member.name}
              />
              <IconButton onClick={() => handleDeleteMember(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>

        <div className="form-group">
          <Button onClick={() => setMemberModalOpen(false)}>Close</Button>
        </div>
      </div>
    </Modal>
  );

  const SetAddressModal = () => (
    <Modal open={isAddressModalOpen} onClose={() => setAddressModalOpen(false)} className="modal">
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
  );

  const SetDateAndTimeModal = () => (
    <Modal
      open={isDateTimeModalOpen}
      onClose={() => setDateTimeModalOpen(false)}
      className="modal"
    >
      <div
        className="modalBody">
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
  );

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
          </div>

          <div className="form-group">
            <Button onClick={() => setDateTimeModalOpen(true)}>
              Set date and time
            </Button>
          </div>

          <div className="form-group">
            <Button onClick={() => setMemberModalOpen(true)}>Add Member</Button>
          </div>

          <div className="form-group">
            <Button variant="contained" onClick={handleSaveMeeting}>
              Save Meeting
            </Button>
          </div>
        </div>
      </Card>
      <SetAddressModal />
      <SetDateAndTimeModal />
      <AddMemberModal />
    </div>
  );
};

export default MeetingForm;
