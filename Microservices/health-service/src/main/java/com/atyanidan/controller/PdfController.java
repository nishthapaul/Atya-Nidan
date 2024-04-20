package com.atyanidan.controller;

import com.atyanidan.entity.PdfStorage;
import com.atyanidan.service.DoctorService;
import com.atyanidan.service.PdfStorageService;
import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/response/pdf")
@RequiredArgsConstructor
public class PdfController {

    private final PdfStorageService pdfStorageService;

    @PostMapping
    public void generatePdf() throws DocumentException {
        pdfStorageService.savePdf();
    }

    @GetMapping("/{pdfId}")
    public ResponseEntity<byte[]> getPdf(@PathVariable int pdfId) throws DocumentException {
        PdfStorage pdf = pdfStorageService.getPdf(pdfId);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(pdf.getContent());
    }

}
