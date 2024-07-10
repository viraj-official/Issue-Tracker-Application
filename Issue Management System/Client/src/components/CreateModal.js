import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    TextareaAutosize,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Company, Severity, Priority, Status } from '../enums';

const CreateModal = ({ open, onClose, onCreate }) => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        company: '',
        severity: '',
        priority: '',
        status: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleCreate = () => {
        onCreate(newTask);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={newTask.title}
                    onChange={handleChange}
                />
                <TextareaAutosize
                    rowsMin={5}
                    rowsMax={10}
                    aria-label="maximum height"
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    style={{ width: '100%', minHeight: '100px', marginTop: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                        labelId="company-label"
                        id="company"
                        name="company"
                        value={newTask.company}
                        onChange={handleChange}
                    >
                        {Object.entries(Company).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="severity-label">Severity</InputLabel>
                    <Select
                        labelId="severity-label"
                        id="severity"
                        name="severity"
                        value={newTask.severity}
                        onChange={handleChange}
                    >
                        {Object.entries(Severity).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority"
                        name="priority"
                        value={newTask.priority}
                        onChange={handleChange}
                    >
                        {Object.entries(Priority).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={newTask.status}
                        onChange={handleChange}
                    >
                        {Object.entries(Status).map(([value, label]) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateModal;