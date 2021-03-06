import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task,
      state: props.state,
      poster: props.poster,
      solver: props.solver,
      user: props.user,
      id: props.id,
      mode: props.mode,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newState = "finished";
      if (this.state.mode === "all") newState = "ongoing";
      const config = { headers: { "Content-Type": "application/json" } };
      const body = {
        id: this.state.id,
        state: newState,
        solver: this.state.user,
      };
      await axios.post("api/taskRoutes/updateTask", body, config);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  handleDelete = async (event) => {
    event.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = {
        id: this.state.id,
      };
      await axios.post("api/taskRoutes/deleteTask", body, config);
      alert("Delete successful");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    var color;
    if(this.state.state === "finished")
      color = "green";
    else if(this.state.state === "ongoing")
      color = "orange";
    else
      color = "red";
    return (
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 24 }}
              color="black"
              gutterBottom
            >
              {this.state.task}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color= {color}>
              Status: {this.state.state}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="black">
              Posted by {this.state.poster}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="black">
              {this.state.solver !== ""
                ? "Taken by " + this.state.solver
                : "No user has taken this task"}
            </Typography>
          </CardContent>
          <CardActions>
            {this.state.state === "finished" ||
            (this.state.state === "ongoing" &&
              this.state.solver === this.state.user &&
              this.state.mode === "all") ||
            this.state.poster === this.state.user ? null : (
              <Button size="small" onClick={this.handleSubmit}>
                {this.state.mode === "all" ? "Take the task" : "Finished"}
              </Button>
            )}
            {this.state.user === this.state.poster ? (
              <Button size="small" onClick={this.handleDelete}>
                Delete
              </Button>
            ) : null}
          </CardActions>
        </Card>
        <br></br>
      </div>
    );
  }
}
