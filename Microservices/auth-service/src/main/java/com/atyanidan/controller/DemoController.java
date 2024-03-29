package com.atyanidan.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan/auth/api")
public class DemoController {

    @GetMapping("/doctor/demo")
    @PreAuthorize("hasAuthority('Doctor')")
    public String demoMethod() {
        return "Demo-String-Auth doctor";
    }

    @GetMapping("/fw/demo")
    @PreAuthorize("hasAuthority('FieldWorker')")
    public String demoMetnkhod() {
        return "Demo-String-Auth fw";
    }

}
