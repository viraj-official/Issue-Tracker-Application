package com.example.issuetracker.service;

import com.example.issuetracker.enums.*;
import com.example.issuetracker.model.Task;

import java.util.List;

public interface TaskService
{
    Task createTask(Task task);
    Task updateTask(Task task);
    Task getTaskById(Integer id);
    List<Task> getAllTasks();
    void deleteTask(Integer id);
    List<Task> searchTasks(String title, String description, Company company, Severity severity, Priority priority, Status status);
}
