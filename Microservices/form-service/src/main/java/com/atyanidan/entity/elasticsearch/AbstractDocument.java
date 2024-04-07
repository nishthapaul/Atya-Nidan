package com.atyanidan.entity.elasticsearch;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Map;

@Data
public abstract class AbstractDocument {
    @Id
    private String id;
    @Field(type = FieldType.Object)
    private Map<String, Object> fields;

}
