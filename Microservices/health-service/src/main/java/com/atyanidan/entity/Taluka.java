package com.atyanidan.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "Taluka")
public class Taluka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taluka_id")
    private int id;

    @Column(name = "name")
    @NotEmpty
    private String name;

    @ManyToOne
    @JoinColumn(name = "district_id")
    @NotEmpty
    private District district;

    public Taluka() {}

    public Taluka(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
