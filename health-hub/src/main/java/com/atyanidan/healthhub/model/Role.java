package com.atyanidan.healthhub.model;

public enum Role {
    FIELD_WORKER("FieldWorker"), DOCTOR("Doctor"), ADMIN("Admin"), SUPER_ADMIN("SuperAdmin");
    private final String name;
    Role(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
