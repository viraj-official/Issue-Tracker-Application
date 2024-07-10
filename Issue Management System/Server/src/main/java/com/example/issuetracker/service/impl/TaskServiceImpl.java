package com.example.issuetracker.service.impl;

import com.example.issuetracker.enums.Company;
import com.example.issuetracker.enums.Priority;
import com.example.issuetracker.enums.Severity;
import com.example.issuetracker.enums.Status;
import com.example.issuetracker.model.Task;
import com.example.issuetracker.repository.TaskRepository;
import com.example.issuetracker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService
{
    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository)
    {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task)
    {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task)
    {
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Integer id)
    {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.orElse(null);
    }

    @Override
    public List<Task> getAllTasks()
    {
        return taskRepository.findAll();
    }

    @Override
    public void deleteTask(Integer id)
    {
        taskRepository.deleteById(id);
    }

    public List<Task> searchTasks(String title, String description, Company company, Severity severity, Priority priority, Status status)
    {
        return taskRepository.searchTasks(title, description, company, severity, priority, status);
    }
}
