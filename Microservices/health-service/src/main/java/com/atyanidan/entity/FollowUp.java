package com.atyanidan.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "Follow_Up")
@Data
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_up_id")
    private int followUpId;

    @Column(name = "repaet_freq")
    private int repeatFreq;

    @Column(name = "days")
    private String days;

    @Enumerated(EnumType.STRING)
    @Column(name = "duration")
    private Duration duration;

    @Column(name = "most_recent_follow_up_date")
    private Date mostRecentFollowUpDate;

    @Column(name = "no_of_follow_ups_completed")
    private int noOfFollowUpsCompleted;
}
