import React from "react";
import { Modal, Card, Typography, List, ListItem } from "@mui/material";
import "./style.css";

const MemberList = ({ isOpen, closeModal, members }) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Card className="modal-container">
        <Typography variant="h5" className="members">
          All Members
        </Typography>
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>{member.name}</ListItem>
          ))}
        </List>
      </Card>
    </Modal>
  );
};

export default MemberList;
