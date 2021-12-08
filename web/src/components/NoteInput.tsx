import React, { useState } from "react";
import { Box, Button, Modal, styled, TextField } from "@mui/material";
import { style2 } from "./TextBox";
import { NoteService } from "../services/NoteService";
import { YellowButton } from "./Navigation";
import { color } from "../theme/color";
import { toast } from "react-toastify";

const CreateNote = styled("button")(({}) => ({
  border: "0.2px solid #00000000",
  borderRadius: "5px",
  backgroundColor: "#fff",
  marginBottom: 16,
  height: 46,
  width: 600,
  boxShadow: "2px 2px 10px 0.5px #888",
  textAlign: "left",
  color: "#202124",
  cursor: "text",
  lineHeight: "1.25rem",
  fontWeight: "900",
  fontSize: "0.875rem",
  marginLeft: "50%",
  /* bring your own prefixes */
  transform: "translate(-50%, -50%)",
}));

export const NoteInputField = styled(TextField)(({}) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: color.yellow_l,
    },
  },
}));

const NoteInput = () => {
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const noteService = new NoteService();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  const handleSave = async () => {
    try {
      await noteService.createNote({ title, body, label });
      handleClose2();
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    }
  };
  return (
    <div>
      <CreateNote onClick={handleOpen2}>Take a note...</CreateNote>{" "}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <NoteInputField
            label="Title"
            fullWidth
            sx={{ mb: 4 }}
            onChange={(e) => setTitle(e.target.value)}
          ></NoteInputField>
          <NoteInputField
            label="Body"
            fullWidth
            minRows={10}
            sx={{ mb: 4 }}
            multiline
            onChange={(e) => setBody(e.target.value)}
          ></NoteInputField>
          <NoteInputField
            label="Label"
            fullWidth
            sx={{ mr: 55 }}
            onChange={(e) => setLabel(e.target.value)}
          ></NoteInputField>
          <YellowButton variant="contained" sx={{ mt: 3 }} onClick={handleSave}>
            Save
          </YellowButton>
        </Box>
      </Modal>
    </div>
  );
};

export default NoteInput;
