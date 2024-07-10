import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    Box,
    Typography,
    IconButton,
    Grid,
    Tooltip
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import axios from 'axios';
import FilterModal from './FilterModal';
import UpdateModal from './UpdateModal';
import CreateModal from './CreateModal';
import { Company, Severity, Priority, Status } from '../enums';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/task/all');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleOpenFilterModal = () => {
        setFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
        setFilterModalOpen(false);
    };

    const handleFilter = async (filters) => {
        try {
            const response = await axios.get('http://localhost:8080/task/search', {
                params: filters,
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error filtering tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/task/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCreate = (newTask) => {
        axios
            .post('http://localhost:8080/task', newTask)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
    };


    const handleUpdate = (task) => {
        axios
            .put(`http://localhost:8080/task`, task)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };

    const handleOpenUpdateModal = (task) => {
        setSelectedTask(task);
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedTask(null);
    };

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
    };

    const renderEnumValue = (value, enumType) => {
        switch (enumType) {
            case 'Company':
                return Company[value];
            case 'Severity':
                return Severity[value];
            case 'Priority':
                return Priority[value];
            case 'Status':
                return Status[value];
            default:
                return value;
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleOpenFilterModal}>
                        Open Filter
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenCreateModal}
                    >
                        Create Task
                    </Button>
                </Grid>
            </Grid>
            <FilterModal
                open={filterModalOpen}
                onClose={handleCloseFilterModal}
                onFilter={handleFilter}
            />
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">Severity</TableCell>
                            <TableCell align="center">Priority</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <React.Fragment key={task.id}>
                                <TableRow>
                                    <TableCell align="center">{task.id}</TableCell>
                                    <TableCell align="center">{task.title}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View Description">
                                            <IconButton
                                                aria-label="view description"
                                                size="small"
                                                onClick={() => handleOpenUpdateModal(task)}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Collapse in={selectedTask === task} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="body2" color="textSecondary" component="div">
                                                    {task.description}
                                                </Typography>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                    <TableCell align="center">{renderEnumValue(task.company, 'Company')}</TableCell>
                                    <TableCell align="center">{renderEnumValue(task.severity, 'Severity')}</TableCell>
                                    <TableCell align="center">{renderEnumValue(task.priority, 'Priority')}</TableCell>
                                    <TableCell align="center">{renderEnumValue(task.status, 'Status')}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Update">
                                            <IconButton
                                                aria-label="update task"
                                                onClick={() => handleOpenUpdateModal(task)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                aria-label="delete task"
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateModal
                open={updateModalOpen}
                onClose={handleCloseUpdateModal}
                task={selectedTask}
                onUpdate={handleUpdate}
            />
            <CreateModal
                open={createModalOpen}
                onClose={handleCloseCreateModal}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default TaskList;
