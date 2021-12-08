import React, { useEffect, useState } from "react";
import TextBox from "../components/TextBox";
import NoteInput from "../components/NoteInput";
import { Grid } from "@mui/material";
import { NoteService } from "../services/NoteService";
import { INote } from "../dto/note.interface";
import { toast } from "react-toastify";

interface IProp {
  isLabel?: boolean;
  label?: string;
  isSearch?: boolean;
  search?: string;
}

const Dashboard: React.FC<IProp> = ({ isLabel, label, isSearch, search }) => {
  const noteService = new NoteService();
  const [notes, setNotes] = useState<INote[]>([]);
  const getNotes = async () => {
    try {
      setNotes(await noteService.getAllNotes());
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (isLabel && !isSearch) {
      getLabelNotes();
    } else if (!isLabel && isSearch) {
      getSearchNotes();
    } else {
      getNotes();
    }
  }, [isLabel, label, isSearch, search, getNotes]);

  const getLabelNotes = async () => {
    if (label) {
      try {
        setNotes(await noteService.getNotesByLabel(label));
      } catch (err) {
        // @ts-ignore
        toast.error(err.message);
      }
    }
  };

  const getSearchNotes = async () => {
    if (search) {
      try {
        setNotes(await noteService.searchNote(search));
      } catch (err) {
        // @ts-ignore
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <NoteInput />
      <Grid container spacing={1}>
        {notes.map((note) => (
          <TextBox
            id={note.id}
            title={note.title}
            body={note.body}
            label={note.label}
          />
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
