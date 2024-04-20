package com.atyanidan.service;

import com.atyanidan.entity.PdfStorage;
import com.itextpdf.text.DocumentException;

public interface PdfStorageService {
    void savePdf() throws DocumentException;

    PdfStorage getPdf(int pdfId);
}
