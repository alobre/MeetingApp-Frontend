import React from "react";
import { Modal, Card, Typography, List, ListItem } from "@mui/material";
import "./style.css";

const MemberList = ({ isOpen, closeModal, members }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Card
        className="modal-container"
        sx={{ maxHeight: "50vh", overflowY: "auto" }}
      >
        <Typography variant="h5" className="members">
          All Members
        </Typography>
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>
              {member.first_name} {member.last_name} {member.email}
            </ListItem>
          ))}
        </List>
      </Card>
    </Modal>
  );
};

export default MemberList;
