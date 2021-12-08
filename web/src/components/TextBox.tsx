import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { INote } from "../dto/note.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { color } from "../theme/color";
import { NoteService } from "../services/NoteService";
import { YellowButton } from "./Navigation";
import { NoteInputField } from "./NoteInput";
import { toast } from "react-toastify";

interface ICreateNote {
  id?: string;
  title?: string;
  body?: string;
  label?: string;
}

export const Note = styled(Card)(({}) => ({
  border: "1px solid #e0e0e0",
  boxShadow: "none",
  marginBottom: 16,
  maxWidth: 244,
  maxHeight: 220,
}));

const Buttons = styled("div")(({}) => ({
  display: "inline-flex",
  marginLeft: "69%",
  alignItems: "center",
  color: color.border_d,
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export const style2 = {
  position: "absolute" as "absolute",
  display: "block",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const TextBox: React.FC<INote> = ({ id, title, body, label }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const noteService = new NoteService();
  const [titleState, setTitleState] = useState<string>(
    typeof title === "string" ? title : ""
  );
  const [bodyState, setBodyState] = useState<string>(
    typeof body === "string" ? body : ""
  );
  const [labelState, setLabelState] = useState<string>(
    typeof label === "string" ? label : ""
  );

  const handleDelete = async () => {
    try {
      if (typeof id === "string") await noteService.deleteNote(id);
      handleClose();
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    }
  };

  const handleUpdate = async ({ id, title, body, label }: ICreateNote) => {
    try {
      await noteService.updateNote({ id, title, body, label });
      handleClose2();
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    }
  };

  return (
    <Grid xs={6} md={4} lg={3} xl={2.4} sm={6}>
      <Note>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Note>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {title && (
              <Typography
                id="modal-modal-title"
                gutterBottom
                sx={{ ml: 0.5 }}
                variant="h5"
                component="div"
                placeholder="Title"
              >
                {title}
              </Typography>
            )}
            <Typography
              id="modal-modal-description"
              gutterBottom
              sx={{ mt: 2, mb: 6, ml: 0.5 }}
              variant="body2"
              color="text.secondary"
            >
              {body}
            </Typography>
            {label && (
              <Chip label={label} variant="outlined" sx={{ mb: 1.5 }} />
            )}
            <Buttons>
              <a onClick={handleOpen2}>
                <EditIcon sx={{ cursor: "pointer" }} />
              </a>
              <a onClick={handleDelete}>
                <DeleteIcon sx={{ ml: 2.5, cursor: "pointer" }} />
              </a>
            </Buttons>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <NoteInputField
                  defaultValue={title}
                  label="Title"
                  sx={{ mb: 4 }}
                  fullWidth
                  onChange={(e) => {
                    setTitleState(e.target.value);
                  }}
                ></NoteInputField>
                <NoteInputField
                  defaultValue={body}
                  label="Body"
                  fullWidth
                  minRows={10}
                  sx={{ mb: 4 }}
                  multiline
                  onChange={(e) => setBodyState(e.target.value)}
                ></NoteInputField>
                <NoteInputField
                  label="Label"
                  fullWidth
                  sx={{ mr: 55 }}
                  defaultValue={label}
                  onChange={(e) => setLabelState(e.target.value)}
                ></NoteInputField>
                <YellowButton
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() =>
                    handleUpdate({
                      id: id,
                      title: titleState,
                      body: bodyState,
                      label: labelState,
                    })
                  }
                >
                  Save
                </YellowButton>
              </Box>
            </Modal>
          </Box>
        </Modal>
      </div>
    </Grid>
  );
};

export default TextBox;
