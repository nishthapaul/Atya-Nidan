package com.atyanidan.entity.elasticsearch;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "diagnosis")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Diagnosis extends AbstractDocument{

    @Field(name = "diagnosis_id", type = FieldType.Integer)
    private int diagnosisId;

    @Field(name = "follow_up_id", type = FieldType.Integer)
    private int followUpId;

    //object for medicines

    @Field(name = "code_id", type = FieldType.Integer)
    private int codeId;

}
