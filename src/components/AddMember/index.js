import React, { useState, useEffect } from "react";
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
import { fetchUsers } from "components/AxiosInterceptor/AxiosInterceptor";

const AddMemberModal = ({ isOpen, onClose, onSave }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hasRightsToEdit, setHasRightsToEdit] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsersFromDatabase = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.users);
    } catch (error) {
      console.error("Error fetching users from the database", error);
    }
  };

  useEffect(() => {
    fetchUsersFromDatabase();
  }, []);

  const handleDeleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const handleMemberSave = () => {
    if (!selectedMember) return;
    const newMember = { first_name: selectedMember, hasRightsToEdit };
    setMembers((prevMembers) => [...prevMembers, newMember]);
    setSelectedMember(null);
    setHasRightsToEdit(false);
    onSave([...members, newMember]);
  };

  const handleCheck = (index) => {
    setMembers((prevMembers) =>
      prevMembers.map((member, i) =>
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
          options={users.map((user) => user.first_name)}
          value={selectedMember}
          onChange={(event, newValue) => {
            setSelectedMember(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Type to search" />
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
            <div key={member.first_name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={member.hasRightsToEdit}
                    onChange={() => handleCheck(index)}
                  />
                }
                label={member.first_name}
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
