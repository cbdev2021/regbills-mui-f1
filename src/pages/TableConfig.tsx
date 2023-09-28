import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface TableConfigProps {
  title: string;
  data: { id: number; subtipo: string }[];
  updateData: (newData: { id: number; subtipo: string }[]) => void;
}

const TableConfig: FunctionComponent<TableConfigProps> = ({ title, data, updateData }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newSubtipo, setNewSubtipo] = useState("");
  const [originalSubtipo, setOriginalSubtipo] = useState("");
  const [addNewSubtipo, setAddNewSubtipo] = useState("");
  const tableRef = useRef<HTMLTableElement | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id);
    const currentItem = data.find((item) => item.id === id);
    if (currentItem) {
      setNewSubtipo(currentItem.subtipo);
      setOriginalSubtipo(currentItem.subtipo);
    }
  };

  const handleSave = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, subtipo: newSubtipo } : item
    );
    updateData(updatedData);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    updateData(updatedData);
  };

  const handleAdd = () => {
    if (addNewSubtipo.trim() !== "") {
      const newId = data.length + 1;
      const newItem = { id: newId, subtipo: addNewSubtipo };
      updateData([...data, newItem]);
      setAddNewSubtipo("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewSubtipo(originalSubtipo);
  };

  useEffect(() => {
    if (!editingId) {
      setAddNewSubtipo("");
    }
  }, [editingId]);

  useEffect(() => {
    // Scroll para llevar el registro editado a la vista
    if (editingId && tableRef.current) {
      const rowElement = tableRef.current.querySelector(`#row-${editingId}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [editingId]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (editingId !== null) {
        handleSave(editingId);
      } else {
        handleAdd();
      }
    }
  };

  return (
    <>
      {/* <Typography variant="h6" gutterBottom>
        {title}
      </Typography> */}
      <TableContainer component={Paper}>
        <Box mt={2} display="flex" justifyContent="center">
          <TextField
            label={`New ${title}`}
            variant="outlined"
            value={addNewSubtipo}
            onChange={(e) => setAddNewSubtipo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton onClick={handleAdd} color="primary">
            <AddIcon />
          </IconButton>
        </Box>

        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{`${title} Type`}</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} id={`row-${row.id}`}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {editingId === row.id ? (
                    <TextField
                      type="text"
                      value={newSubtipo}
                      onChange={(e) => setNewSubtipo(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  ) : (
                    row.subtipo
                  )}
                </TableCell>
                <TableCell>
                  {editingId === row.id ? (
                    <>
                      <IconButton onClick={() => handleSave(row.id)} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancelEdit} color="default">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(row.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableConfig;
