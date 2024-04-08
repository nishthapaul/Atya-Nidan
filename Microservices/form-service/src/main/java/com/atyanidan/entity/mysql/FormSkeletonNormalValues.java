package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Form_Skeleton_Normal_Values")
@Data
public class FormSkeletonNormalValues {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_skeleton_normal_values_id")
    private int formSkeletonNormalValuesId;

    @Column(name = "normal_values_id")
    private int normalValuesId;

    @OneToMany
    private List<FormSkeleton> formSkeleton;

}
