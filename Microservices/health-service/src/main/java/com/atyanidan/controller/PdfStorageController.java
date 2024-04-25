package com.atyanidan.controller;

import com.atyanidan.entity.PdfStorage;
import com.atyanidan.service.PdfStorageService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<byte[]> getPdf(@PathVariable int pdfId) throws DocumentException {
        PdfStorage pdf = pdfStorageService.getPdf(pdfId);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdf.getContent());
    }

}
