import React from "react";
import TaskForm from "./TaskForm";
import Button from "@material-ui/core/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaIcons from "@fortawesome/free-solid-svg-icons";

library.add(FaIcons.fas);

import "./styles.css";

export default function App() {
  const [task, setTask] = React.useState([]);
  const [isComplete, setisComplete] = React.useState([]);

  const addTask = (taskName, date) => {
    setTask([...task, { id: task.length + 1, taskName, date }]);
  };

  return (
    <div>
      <TaskForm addTask={addTask} />

      {task.length ? (
        <ul>
          <h2>List of Tasks:</h2>

          {task
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((t) => {
              return (
                <li className="tasks" key={t.id}>
                  {t.date ? (
                    <span>
                      {" "}
                      Task: {t.taskName} Due : {t.date}{" "}
                    </span>
                  ) : (
                    <span>
                      Task : {t.taskName}
                      {"  "}
                    </span>
                  )}
                  {isComplete[t.taskName + t.id] ? (
                    <span className="fa-layers fa-fw">
                      <FontAwesomeIcon icon="square" color="green" />
                      <FontAwesomeIcon
                        icon="check"
                        inverse
                        transform="shrink-6"
                      />
                    </span>
                  ) : (
                    <span>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) =>
                          setisComplete({
                            ...isComplete,
                            [t.taskName + t.id]: true
                          })
                        }
                      >
                        Done
                      </Button>
                    </span>
                  )}
                  <br />
                </li>
              );
            })}
        </ul>
      ) : null}
    </div>
  );
}
