/*

"Route" for creating a new meeting. Takes user inputs and saves the meeting
information to db.

*/

import { useEffect, useState } from "react";
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
  InputLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, Navigate } from "react-router-dom";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./style.css";
import AddMemberModal from "components/AddMember";
import AddMeetingSerie from "components/AddMeetingSerie";
import NotificationScreen from "routes/Notification";
import { createMeeting } from "components/AxiosInterceptor/AxiosInterceptor";

// hard coded types; TODO probably need more
const meetingTypes = [
  { label: "Board" },
  { label: "IT Department" },
  { label: "Project Stardust" },
];

const MeetingForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(null);
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [title, setTitle] = useState("");
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [isDateTimeModalOpen, setDateTimeModalOpen] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [meetingType, setMeetingType] = useState(null);
  const [meetingOwner, setMeetingOwner] = useState(null);

  // user has to be logged in, if not go to login screen
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") !== null;
    if (isAuthenticated) {
      const active_uid = localStorage.getItem("active_uid");
      setMeetingOwner(active_uid);
    } else {
      navigate("/Login");
    }
  }, []);

  const [meetingSerie, setMeetingSerie] = useState([]);

  // ToTest search for meetingSerie
  const handleToSearchForMeetingSerie = () => {
    setMeetingSerie([]); 
  };

  const handleAddressSave = () => {
    console.log("closing");
    setAddressModalOpen(false);
  };

  const handleDateTimeSave = () => {
    setDateTimeModalOpen(false);
  };

  const handleSaveMeeting = async () => {
    const meetingData = {
      address,
      building,
      room,
      date: date ? dayjs(date).format("YYYY-MM-DD") : null,
      start_time: start_time ? dayjs(start_time).format("HH:mm") : null,
      end_time: end_time ? dayjs(end_time).format("HH:mm") : null,
      title,
      members,
      meetingType: meetingType.label,
      meetingSerie: [],
      owner: meetingOwner,
    };


    try {
      const response = await createMeeting(meetingData);
      console.log("Meeting created:", response);

      // Reset all form inputs to initial state
      setAddress("");
      setBuilding("");
      setRoom("");
      setDate(null);
      setStartTime(null);
      setEndTime(null);
      setTitle("");
      setMembers([]);
      setMeetingType(null);
      navigate("/");
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleMemberSave = (selectedMembers) => {
    setMembers(selectedMembers);
  };

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
                    label="Start Time"
                    value={start_time}
                    onChange={(newValue) => setStartTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={end_time}
                    onChange={(newValue) => setEndTime(newValue)}
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
            <div className="autocomplete">
              <InputLabel htmlFor="meeting-type">Meeting Type</InputLabel>

              <Autocomplete
                options={meetingTypes}
                getOptionLabel={(option) => option.label}
                value={meetingType}
                onChange={(event, newValue) => setMeetingType(newValue)}
                renderInput={(params) => <TextField {...params} />}
                className="custom-autocomplete-input"
              />
            </div>
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
