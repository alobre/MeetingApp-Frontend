/*

This component is a "modal" for searching for and adding members. 
Uses LDAP search.

*/

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

const AddMemberModal = ({ isOpen, onClose, onSave, externalMembers }) => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hasRightsToEdit, setHasRightsToEdit] = useState(false);
  const [users, setUsers] = useState([]);

  // search for users and fetch the list from db that is presented in the dropdown

  const fetchUsersFromDatabase = async (query) => {
    try {
      const response = await fetchUsers(query);

      const ldapUsers = response.ldapUser;

      if (ldapUsers && ldapUsers.length > 0) {
        const usersList = ldapUsers.map((ldapUser) => {
          const cnAttribute = ldapUser.attributes.find(
            (attr) => attr.type === "cn"
          );
          const uidAttribute = ldapUser.attributes.find(
            (attr) => attr.type === "uid"
          );
          const mailAttribute = ldapUser.attributes.find(
            (attr) => attr.type === "mail"
          );

          const cnValues = cnAttribute ? cnAttribute.values.join(", ") : "";
          const uidValues = uidAttribute ? uidAttribute.values.join(", ") : "";
          const mailValues = mailAttribute
            ? mailAttribute.values.join(", ")
            : "";

          const combinedValues = [cnValues, uidValues, mailValues];

          return combinedValues.join(", ");
        });

        const parsedUsersObjects = usersList.map((item) => {
          const [name, uid, email] = item.split(", ");
          return { name, uid, email };
        });

        console.log("ext mem " + JSON.stringify(externalMembers));
        console.log("int mem " + JSON.stringify(members));
        console.log("user list " + JSON.stringify(usersList));

        // check for already added users to avoid duplicates

        let filteredUsers = [];
        if (externalMembers) {
          filteredUsers = usersList.filter(
            (user) =>
              !members.some((member) => member.first_name === user) &&
              !externalMembers.some(
                (externalMember) =>
                  externalMember.ldap_name === user.split(", ")[1]
              )
          );
        } else {
          filteredUsers = usersList.filter(
            (user) => !members.some((member) => member.first_name === user)
          );
        }

        // set the combined values in the state
        setUsers(filteredUsers);
      } else {
        console.log("No attributes found in the LDAP response.");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users from LDAP", error);
    }
  };

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
          options={users}
          value={selectedMember}
          onChange={(event, newValue) => {
            setSelectedMember(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            fetchUsersFromDatabase(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Type to search"
              style={{ width: 300 }} //
            />
          )}
          style={{ width: 300 }}
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

        <div
          className="form-group"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
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
