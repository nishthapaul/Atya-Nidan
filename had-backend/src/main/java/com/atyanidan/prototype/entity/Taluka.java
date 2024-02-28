package com.atyanidan.prototype.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Taluka")
public class Taluka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taluka_id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "district_id")
    @JsonBackReference(value = "district-taluka")
    private District district;

    @OneToMany(mappedBy = "taluka", cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JsonBackReference(value = "fieldworker-taluka")
    private List<FieldWorker> fieldWorkers;

    public Taluka() {
    }

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

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public List<FieldWorker> getFieldWorkers() {
        return fieldWorkers;
    }

    public void setFieldWorkers(List<FieldWorker> fieldWorkers) {
        this.fieldWorkers = fieldWorkers;
    }

}
