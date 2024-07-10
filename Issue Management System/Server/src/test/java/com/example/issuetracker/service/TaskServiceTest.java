package com.example.issuetracker.service;

import com.example.issuetracker.enums.*;
import com.example.issuetracker.model.Task;
import com.example.issuetracker.repository.TaskRepository;
import com.example.issuetracker.service.impl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @InjectMocks
    private TaskServiceImpl taskService;

    @Mock
    private TaskRepository taskRepository;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        task = new Task();
        task.setId(1);
        task.setTitle("Test Task");
        task.setDescription("This is a test task");
        task.setCompany(Company.APPLE);
        task.setSeverity(Severity.HIGH);
        task.setPriority(Priority.HIGH);
        task.setStatus(Status.OPEN);
    }

    @Test
    public void testCreateTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task createdTask = taskService.createTask(task);
        assertNotNull(createdTask);
        assertEquals(task.getTitle(), createdTask.getTitle());
        assertEquals(task.getDescription(), createdTask.getDescription());

        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testUpdateTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task updatedTask = taskService.updateTask(task);
        assertNotNull(updatedTask);
        assertEquals(task.getTitle(), updatedTask.getTitle());
        assertEquals(task.getDescription(), updatedTask.getDescription());

        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testGetTaskById() {
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        Task foundTask = taskService.getTaskById(1);
        assertNotNull(foundTask);
        assertEquals(task.getTitle(), foundTask.getTitle());
        assertEquals(task.getDescription(), foundTask.getDescription());

        verify(taskRepository, times(1)).findById(1);
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = Arrays.asList(task);
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> allTasks = taskService.getAllTasks();
        assertNotNull(allTasks);
        assertEquals(1, allTasks.size());
        assertEquals(task.getTitle(), allTasks.get(0).getTitle());

        verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1);

        taskService.deleteTask(1);

        verify(taskRepository, times(1)).deleteById(1);
    }

    @Test
    public void testSearchTasks() {
        List<Task> tasks = Arrays.asList(task);
        when(taskRepository.searchTasks(any(), any(), any(), any(), any(), any())).thenReturn(tasks);

        List<Task> foundTasks = taskService.searchTasks("Test Task", null, null, null, null, null);
        assertNotNull(foundTasks);
        assertEquals(1, foundTasks.size());
        assertEquals(task.getTitle(), foundTasks.get(0).getTitle());

        verify(taskRepository, times(1)).searchTasks(any(), any(), any(), any(), any(), any());
    }
}
