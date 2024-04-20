package com.atyanidan.service;

import com.atyanidan.dao.PdfStorageRepository;
import com.atyanidan.entity.PdfStorage;
import com.atyanidan.exception.NotFoundException;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
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

    public void savePdf() throws DocumentException {
        byte[] content = generateFormPdf();
        PdfStorage pdfStorage = new PdfStorage();
        pdfStorage.setContent(content);
        pdfStorageRepository.save(pdfStorage);
    }

    @Override
    public PdfStorage getPdf(int pdfId) {
        Optional<PdfStorage> optional = pdfStorageRepository.findById(pdfId);
        if (optional.isEmpty()) {
            throw new NotFoundException("pdf not found");
        }
        return optional.get();
    }

    byte[] generateFormPdf() throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);

        document.open();

        // Add content to the PDF using iTextpdf methods
        Paragraph titleParagraph = new Paragraph("Title");
        document.add(titleParagraph);
        document.add(new Paragraph("data text sentence"));

        document.close();

        return baos.toByteArray();
    }
}
