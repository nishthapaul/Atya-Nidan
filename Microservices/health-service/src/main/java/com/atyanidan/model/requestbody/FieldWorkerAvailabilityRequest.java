package com.atyanidan.model.requestbody;

public class FieldWorkerAvailabilityRequest {
    private Boolean isAvailable;

    private int substituteFieldWorkerId;

    public FieldWorkerAvailabilityRequest() {
    }

    public FieldWorkerAvailabilityRequest(Boolean isAvailable, int substituteFieldWorkerId) {
        this.isAvailable = isAvailable;
        this.substituteFieldWorkerId = substituteFieldWorkerId;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public int getSubstituteFieldWorkerId() {
        return substituteFieldWorkerId;
    }

    public void setSubstituteFieldWorkerId(int substituteFieldWorkerId) {
        this.substituteFieldWorkerId = substituteFieldWorkerId;
    }

    @Override
    public String toString() {
        return "FieldWorkerAvailabilityRequest{" +
                "isAvailable=" + isAvailable +
                ", substituteFieldWorkerId=" + substituteFieldWorkerId +
                '}';
    }
}
