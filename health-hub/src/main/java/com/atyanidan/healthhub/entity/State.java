package com.atyanidan.healthhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "State")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "state_id")
    private int id;

    @Column(name = "name")
    private String name;

    public State() {}

    public State(String name) {
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
