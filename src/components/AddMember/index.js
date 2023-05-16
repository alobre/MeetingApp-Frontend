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

// const users = [
//     { name: "Amelie Boehme", email: "amelie@fhtw.at" },
//     { name: "Philipp Kis", email: "philipp@fhtw.at" },
//     { name: "Johanna", email: "johanna@fhtw.at" },
//     { name: "Ana Matic", email: "ana@fhtw.at" },
//     { name: "Florian Eckkrammer", email: "florian@fhtw.at" },
//   ];

const users = ["Amelie", "Philipp", "Johanna", "Ana", "Florian"];

const AddMemberModal = ({ isOpen, onClose, onSave }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hasRightsToEdit, setHasRightsToEdit] = useState(false);
  const [isMemberModalOpen, setMemberModalOpen] = useState(false);

  const handleDeleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberSave = () => {
    if (!selectedMember) return;
    setMembers([...members, { name: selectedMember, hasRightsToEdit }]);
    setSelectedMember(null);
    setHasRightsToEdit(false);
    onSave([...members, { name: selectedMember, hasRightsToEdit }]);
  };

  const handleCheck = (index) => {
    setMembers((prevState) =>
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
              checked={hasRightsToEdit}
              onChange={(event) => setHasRightsToEdit(event.target.checked)}
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
