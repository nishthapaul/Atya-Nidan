package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "Form_Skeleton")
@Data
public class FormSkeleton {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_skeleton_id")
    private int formSkeletonId;

    @Column(name = "title")
    private String title;

    @Column(name = "date_of_creation")
    private Date dateOfCreation;

    @Column(name = "default_form", columnDefinition = "DEFAULT 0")
    private boolean defaultForm;

    @ManyToOne
    @JoinColumn(name = "specialisation_id")
    @NotNull
    private Specialisation specialisation;
}
