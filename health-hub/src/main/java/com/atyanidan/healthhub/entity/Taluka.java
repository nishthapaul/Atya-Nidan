package com.atyanidan.healthhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Taluka")
public class Taluka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taluka_id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "district_id")
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
