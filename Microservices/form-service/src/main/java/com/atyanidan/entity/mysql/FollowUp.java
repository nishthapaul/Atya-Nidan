package com.atyanidan.entity.mysql;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "Follow_Up")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_up_id")
    private int followUpId;

    @Column(name = "repeat_frequency")
    private int repeatFrequency;

    @Column(name = "interval_in_days")
    private int intervalInDays;

    @Column(name = "most_recent_follow_up_date")
    private Timestamp mostRecentFollowUpDate;

    @Column(name = "no_of_follow_ups_completed")
    private int noOfFollowUpsCompleted;

    public FollowUp(int repeatFrequency, int intervalInDays, Timestamp mostRecentFollowUpDate, int noOfFollowUpsCompleted) {
        this.repeatFrequency = repeatFrequency;
        this.intervalInDays = intervalInDays;
        this.mostRecentFollowUpDate = mostRecentFollowUpDate;
        this.noOfFollowUpsCompleted = noOfFollowUpsCompleted;
    }
}
