package com.atyanidan.entity.elasticsearch;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "olap_form")
public class OlapForm {
    @Id
    @JsonIgnore
    private String id;

    @Field(type = FieldType.Object)
    private Map<String, Object> fields;

}
