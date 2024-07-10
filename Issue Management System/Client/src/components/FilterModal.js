import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

const FilterModal = ({ open, onClose, onFilter }) => {
    const initialFilters = {
        title: '',
        description: '',
        company: '',
        severity: '',
        priority: '',
        status: '',
    };

    const [filters, setFilters] = useState({ ...initialFilters });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleApplyFilter = () => {
        onFilter(filters);
        onClose();
    };

    const handleResetFilters = () => {
        setFilters({ ...initialFilters });
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Filter Tasks</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={filters.title}
                    onChange={handleFilterChange}
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={filters.description}
                    onChange={handleFilterChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                        labelId="company-label"
                        id="company"
                        name="company"
                        value={filters.company}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="MICROSOFT">Microsoft</MenuItem>
                        <MenuItem value="APPLE">Apple</MenuItem>
                        <MenuItem value="SAMSUNG">Samsung</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="severity-label">Severity</InputLabel>
                    <Select
                        labelId="severity-label"
                        id="severity"
                        name="severity"
                        value={filters.severity}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority"
                        name="priority"
                        value={filters.priority}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="LOW">Low</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="HIGH">High</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="OPEN">Open</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="TESTING">Testing</MenuItem>
                        <MenuItem value="CLOSED">Closed</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleResetFilters} color="secondary">
                    Reset
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApplyFilter} color="primary">
                    Apply Filter
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterModal;