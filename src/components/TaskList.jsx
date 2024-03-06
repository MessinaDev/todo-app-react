import React from "react";
// import List from "@mui/material/List";
import { Box } from "@mui/material";
// import { Box, ListItem, ListItemText } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DoneIcon from "@mui/icons-material/Done";
// import Fab from "@mui/material/Fab";

export default function TaskList({ tasks }) {
  console.log("🚀 ~ listItems ~ tasks:", tasks);
  // const listItems = tasks.map((t) => {
  //   return (
  //     <ListItem>
  //       <ListItemText primary={t.text}></ListItemText>
  //       <Fab color="error" aria-label="delete" sx={{ ml: 2 }}>
  //         <DeleteIcon />
  //       </Fab>
  //       <Fab color="secondary" aria-label="done" sx={{ ml: 4 }}>
  //         <DoneIcon />
  //       </Fab>
  //     </ListItem>
  //   );
  // });

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <h2>To complete</h2>
        {/* <List>{listItems}</List> */}
      </Box>
    </>
  );
}
