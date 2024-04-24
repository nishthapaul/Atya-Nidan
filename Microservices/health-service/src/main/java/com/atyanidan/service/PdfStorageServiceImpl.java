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
        byte[] content = generateFormPdf();
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

    byte[] generateFormPdf() throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);

        document.open();

        // Add content to the PDF using iTextpdf methods
        Paragraph titleParagraph = new Paragraph("Title");
        document.add(titleParagraph);
        document.add(new Paragraph("This text doesn't have any fancy font"));
        Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD, BaseColor.BLUE);
        Font regularFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.NORMAL);
        document.add(new Paragraph("This text is bold", boldFont));
        document.add(new Paragraph("This text is regular", regularFont));

        Paragraph centeredText = new Paragraph("This text is center", regularFont);
        centeredText.setAlignment(Element.ALIGN_CENTER);
        document.add(centeredText);

        document.close();

        return baos.toByteArray();
    }
}
