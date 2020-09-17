import React from "react";
import Button from "@material-ui/core/Button";
import { Field, Form, Formik, FormikProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import Datetime from "react-datetime";
import styles from "react-datetime/css/react-datetime.css";

import "./styles.css";

export default function TaskForm({ addTask }) {
  const [date, setDate] = React.useState("");

  var yesterday = Datetime.moment().subtract(1, "day");
  var valid = function (current, selected) {
    return current.isAfter(yesterday);
  };

  return (
    <div>
      <Formik
        initialValues={{ taskName: "", date: "" }}
        validationSchema={Yup.object().shape({
          taskName: Yup.string().required("Please enter task name")
        })}
        onSubmit={(values, { resetForm }) => {
          addTask(values.taskName, values.date);
          resetForm({ values: "" });
          setDate("");
        }}
        render={({ submitForm, isSubmitting, values, setFieldValue }) => (
          <Form>
            <h1> Add Task</h1>
            <Field id="taskname" name="taskName" placeholder="* Task Name" />

            <div style={{ color: "red", fontWeight: "bold" }}>
              <ErrorMessage name="taskName" />
            </div>
            <br />
            <Field
              name="date"
              size="large"
              render={({ field, form: { isSubmitting } }) => (
                <Datetime
                  className={styles.rdt}
                  value={date}
                  timeFormat={true}
                  isValidDate={valid}
                  closeOnSelect={true}
                  inputProps={{ placeholder: "Task due date" }}
                  onChange={(date) => {
                    setFieldValue("date", date.format("MM/DD/YY HH:mm a"));
                    setDate(date);
                  }}
                />
              )}
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Add Task
            </Button>
          </Form>
        )}
      />
    </div>
  );
}
