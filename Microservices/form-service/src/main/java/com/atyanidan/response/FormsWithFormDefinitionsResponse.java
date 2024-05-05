package com.atyanidan.response;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Specialisation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormsWithFormDefinitionsResponse {
    private int formId;
    private String title;
    private Boolean selected;
    private FormDefinition formDefinition;
    private Specialisation specialisation;
}
