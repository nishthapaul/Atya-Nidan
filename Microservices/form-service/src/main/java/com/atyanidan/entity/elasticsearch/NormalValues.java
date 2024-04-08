package com.atyanidan.entity.elasticsearch;

import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "normal_values")
public class NormalValues extends AbstractDocument{
}
