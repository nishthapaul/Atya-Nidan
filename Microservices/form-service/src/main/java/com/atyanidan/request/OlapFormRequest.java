package com.atyanidan.request;

import com.atyanidan.entity.mysql.FormType;
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

    private String patientIdNumber;

    private String fieldWorkerId;

    @Field(type = FieldType.Object)
    private Map<String, Object> fields;

    @Field(type = FieldType.Object)
    private Map<String, Object> questions;

    private FormType formType;

}
