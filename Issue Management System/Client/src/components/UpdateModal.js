import React, { useState, useEffect } from 'react';
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

const UpdateModal = ({ open, onClose, task, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = useState({
        title: '',
        description: '',
        company: '',
        severity: '',
        priority: '',
        status: '',
    });

    useEffect(() => {
        if (task) {
            setUpdatedTask({ ...task });
        }
    }, [task]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleUpdate = () => {
        onUpdate(updatedTask);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={updatedTask.title}
                    onChange={handleChange}
                />
                <TextareaAutosize
                    rowsMin={5}
                    rowsMax={10}
                    aria-label="maximum height"
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={updatedTask.description}
                    onChange={handleChange}
                    style={{ width: '100%', minHeight: '100px', marginTop: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                        labelId="company-label"
                        id="company"
                        name="company"
                        value={updatedTask.company || ''}
                        onChange={handleChange}
                    >
                        {Object.entries(Company).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
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
                        value={updatedTask.severity || ''}
                        onChange={handleChange}
                    >
                        {Object.entries(Severity).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
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
                        value={updatedTask.priority || ''}
                        onChange={handleChange}
                    >
                        {Object.entries(Priority).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
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
                        value={updatedTask.status || ''}
                        onChange={handleChange}
                    >
                        {Object.entries(Status).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateModal;