import React, { useState } from "react";
import style from "./style.css";
import MeetingTable from "../../components/MeetingTable";

const HomeScreen = () => {
  const [tableData, setTableData] = useState([
    {
      date: "22.01.2023",
      title: "Meeting Board",
    },
    {
      date: "23.01.2023",
      title: "Project Stardust Team Meeting",
    },
    {
      date: "24.01.2023",
      title: "Board MeetingII",
    },
    {
      date: "25.01.2023",
      title: "Meeting BoardIV",
    },
    {
      date: "26.01.2023",
      title: "Semester Opening",
    },
  ]);

  return (
    <div>
      <MeetingTable data={tableData} />
    </div>
  );
};
export default HomeScreen;
