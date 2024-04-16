package com.atyanidan.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OlapFormRequest {

    private int formId;

    private String abhaNumber;

    private int fieldWorkerId;

    @Field(type = FieldType.Object)
    private Map<String, Object> fields;

}
