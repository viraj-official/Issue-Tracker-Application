package com.example.issuetracker.repository;

import com.example.issuetracker.enums.Company;
import com.example.issuetracker.enums.Priority;
import com.example.issuetracker.enums.Severity;
import com.example.issuetracker.enums.Status;
import com.example.issuetracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer>
{
    @Query("SELECT t FROM Task t WHERE (:title IS NULL OR t.title LIKE %:title%) " +
            "AND (:description IS NULL OR t.description LIKE %:description%) " +
            "AND (:company IS NULL OR t.company = :company) " +
            "AND (:severity IS NULL OR t.severity = :severity) " +
            "AND (:priority IS NULL OR t.priority = :priority) " +
            "AND (:status IS NULL OR t.status = :status)")
    List<Task> searchTasks(@Param("title") String title,
                           @Param("description") String description,
                           @Param("company") Company company,
                           @Param("severity") Severity severity,
                           @Param("priority") Priority priority,
                           @Param("status") Status status);
}