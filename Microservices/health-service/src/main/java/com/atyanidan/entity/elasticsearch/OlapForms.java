package com.atyanidan.entity.elasticsearch;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "olap_forms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OlapForms extends AbstractDocument{

    @Field(name = "form_id", type = FieldType.Integer)
    private int formId;

    @Field(name = "form_skeleton_id", type = FieldType.Integer)
    private int formSkeletonId;

    @Field(name = "patient_id", type = FieldType.Integer)
    private int patientId;

    @Field(name = "score", type = FieldType.Integer)
    private int score;



}
