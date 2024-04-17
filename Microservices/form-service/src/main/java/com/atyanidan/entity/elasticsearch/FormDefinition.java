package com.atyanidan.entity.elasticsearch;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "form_definition")
public class FormDefinition {
    @Id
    @JsonIgnore
    private String id;
    private String title;
    private String description;
    private String specialisation;

    @Field(type = FieldType.Object)
    private List<Map<String, Object>> questions;
}
