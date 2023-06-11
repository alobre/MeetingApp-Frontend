
/* TODO hier muss ich mir die Meeting Serien in ein array zusammen holen */ 
/* wo abfangen */ 

import React, { useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const users = [
  "Amelie",
  "Philipp",
  "Johanna",
  "Ana",
  "Florian",
];

const AddMemberModal = ({ isOpen, onClose, onSave }) => {
  const [meetingSeries, setMeetingSeries] = useState([]); // State für Meetingserien
  const [selectedMember, setSelectedMember] = useState(null);
  const [hasRightsToEdit, setHasRightsToEdit] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);

  const handleDeleteMember = (index) => {
    setMeetingSeries((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleMemberSave = () => {
    if (!selectedMember) return;
    const newMember = { name: selectedMember, hasRightsToEdit };
    setMeetingSeries((prevState) => [...prevState, newMember]);
    setSelectedMember(null);
    setHasRightsToEdit(false);
    onSave([...meetingSeries, newMember]); // jetztan Meetingserien-Array an onSave übergeben
  };

  const handleCheck = (index) => {
    setMeetingSeries((prevState) =>
      prevState.map((member, i) =>
        i === index
          ? { ...member, hasRightsToEdit: !member.hasRightsToEdit }
          : member
      )
    );
  };

  return (
    <Modal id="addMember" open={isOpen} onClose={onClose} className="modal">
      <div className="modalBody">
        <h2>Add Member</h2>
        <Autocomplete
          options={users.filter(
            (user) => !meetingSeries.find((member) => member.name === user)
          )}
          value={selectedMember}
          onChange={(event, newValue) => {
            setSelectedMember(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Type to search"
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasRightsToEdit}
              onChange={(event) => setHasRightsToEdit(event.target.checked)}
            />
          }
          label="Can edit agenda"
        />
        <Button onClick={handleMemberSave}>Add Member</Button>

        <div className="form-group">
          {meetingSeries.map((member, index) => (
            <div key={member.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={member.hasRightsToEdit}
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
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
