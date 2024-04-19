package com.atyanidan.model.requestbody;

public class FieldWorkerAvailabilityRequest {
    private Boolean isAvailable;

    private String substituteFieldWorkerEmpId;

    public FieldWorkerAvailabilityRequest() {
    }

    public FieldWorkerAvailabilityRequest(Boolean isAvailable, String substituteFieldWorkerEmpId) {
        this.isAvailable = isAvailable;
        this.substituteFieldWorkerEmpId = substituteFieldWorkerEmpId;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public String getSubstituteFieldWorkerEmpId() {
        return substituteFieldWorkerEmpId;
    }

    public void setSubstituteFieldWorkerEmpId(String substituteFieldWorkerEmpId) {
        this.substituteFieldWorkerEmpId = substituteFieldWorkerEmpId;
    }

    @Override
    public String toString() {
        return "FieldWorkerAvailabilityRequest{" +
                "isAvailable=" + isAvailable +
                ", substituteFieldWorkerId=" + substituteFieldWorkerEmpId +
                '}';
    }
}
