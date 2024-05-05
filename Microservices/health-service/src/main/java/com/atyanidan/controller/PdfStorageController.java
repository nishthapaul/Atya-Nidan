package com.atyanidan.controller;

import com.atyanidan.entity.PdfStorage;
import com.atyanidan.service.PdfStorageService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/api/pdfwriter")
@RequiredArgsConstructor
public class PdfStorageController {

    private final PdfStorageService pdfStorageService;

    @PostMapping
    public PdfStorage generatePdf() throws DocumentException {
        return pdfStorageService.savePdf();
    }

    @GetMapping("/{pdfId}")
    public ResponseEntity<PdfStorage> getPdf(@PathVariable int pdfId) throws DocumentException {
        PdfStorage pdf = pdfStorageService.getPdf(pdfId);
        return ResponseEntity.ok().body(pdf);
    }

}
