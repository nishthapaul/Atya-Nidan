package com.atyanidan.utils;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IdGenerator {
    @Value("${employee.id.salt}")
    private String SALT;

    public String generate(String prefix, int id, String firstName) {
        System.out.println("inside generate SHA Id");
        String preHashString = id + "|" + firstName + "|" + SALT;
        String sha3Hex = new DigestUtils("SHA3-256").digestAsHex(preHashString);
        return prefix + sha3Hex.substring(0, 6);
    }
}
