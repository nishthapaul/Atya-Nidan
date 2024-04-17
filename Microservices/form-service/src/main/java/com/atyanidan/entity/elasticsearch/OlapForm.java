package com.atyanidan.entity.elasticsearch;

import com.atyanidan.entity.mysql.FormType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "olap_form")
public class OlapForm {
    @Id
    @JsonIgnore
    private String id;

    private int formId;

    private int fieldWorkerId;

    private Map<String, Object> fields;

    private FormType formType;

    public OlapForm(int formId, int fieldWorkerId, FormType formType, Map<String, Object> fields) {
        this.formId = formId;
        this.fieldWorkerId = fieldWorkerId;
        this.formType = formType;
        this.fields = fields;
    }
}
