package com.atyanidan.service;

import com.atyanidan.dao.PdfStorageRepository;
import com.atyanidan.entity.PdfStorage;
import com.atyanidan.exception.NotFoundException;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Optional;

@Service
public class PdfStorageServiceImpl implements PdfStorageService {
    PdfStorageRepository pdfStorageRepository;

    @Autowired
    public PdfStorageServiceImpl(PdfStorageRepository pdfStorageRepository) {
        this.pdfStorageRepository = pdfStorageRepository;
    }

    public PdfStorage savePdf() throws DocumentException {
        String content = generateFormPdf();
        PdfStorage pdfStorage = new PdfStorage();
        pdfStorage.setContent(content);
        PdfStorage savedPDF = pdfStorageRepository.save(pdfStorage);
        return savedPDF;
    }

    @Override
    public PdfStorage getPdf(int pdfId) {
        Optional<PdfStorage> optional = pdfStorageRepository.findById(pdfId);
        if (optional.isEmpty()) {
            throw new NotFoundException("pdf not found");
        }
        return optional.get();
    }

    String generateFormPdf() throws DocumentException {
        StringBuilder sb = new StringBuilder();
        sb.append("<html>");
        sb.append("<head><title>Prescription Details</title></head>");
        sb.append("<body>");
        sb.append("<p>This text is bold</p>");
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }
}
