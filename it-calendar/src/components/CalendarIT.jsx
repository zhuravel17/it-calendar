import React, { useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTasks, fetchTasksCalendar } from "../requests/problemAPI";

const localizer = momentLocalizer(moment);

const CalendarIT = observer(() => {
  const { problem } = useContext(Context);

  useEffect(() => {
    fetchTasksCalendar(problem.selectedProject, problem.selectedStep).then(
      (data) => {
        problem.setTasks(data);
        console.log(data);
      }
    );
  }, [problem.selectedProject, problem.selectedStep]);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={problem.tasks}
        titleAccessor="task_name"
        startAccessor="date_begin_task"
        endAccessor="date_complete_task"
        style={{ height: 500, margin: "20px 50px" }}
      />
    </div>
  );
});

export default CalendarIT;
