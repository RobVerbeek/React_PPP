import React from "react";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, icon }) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt="" /> {title}
      </h2>
      <TaskCard title="This is Sample Text" tags={["HTML", "CSS"]} />
    </section>
  );
};

export default TaskColumn;
