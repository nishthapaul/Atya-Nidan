package com.atyanidan.utils;

import com.atyanidan.entity.Patient;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.entity.elasticsearch.OlapPrescription.PrescriptionDetails.Dosage;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class PdfGenerator {
    Font boldBlackFont;
    Font regularBlackFont;
    Font regularBlueFont;

    public PdfGenerator() {
        regularBlueFont = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL, BaseColor.BLUE);
        boldBlackFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD);
        regularBlackFont = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.NORMAL);
    }

    public byte[] generatePrescriptionPdf(Doctor doctor, Patient patient, OlapPrescription olapPrescription) throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, output);

        document.open();

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        Paragraph datePara = new Paragraph(formatter.format(date));
        datePara.setAlignment(Element.ALIGN_RIGHT);
        document.add(datePara);

        Paragraph docTitle = new Paragraph(patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName(), boldBlackFont);
        docTitle.setAlignment(Element.ALIGN_CENTER);
        document.add(docTitle);
        docTitle = new Paragraph(olapPrescription.getFormTitle() + " Prescription", boldBlackFont);
        docTitle.setAlignment(Element.ALIGN_CENTER);
        document.add(docTitle);

        document.add(new Paragraph("Dr. " + doctor.getFirstName() + " " + doctor.getLastName(), regularBlueFont));
        document.add(new Paragraph(doctor.getSpecialisation().getName(), regularBlueFont));
        document.add(new Paragraph(doctor.getHospitalAddress(), regularBlueFont));
        document.add(new Paragraph(doctor.getNearestRailwayStation(), regularBlueFont));
        document.add(new Paragraph(doctor.getPhoneNumber(), regularBlueFont));

        document.add(new Paragraph(" "));

        document.add(new Paragraph("Patient Details", boldBlackFont));
        document.add(new Paragraph("Name: " + patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName(), regularBlackFont));
        document.add(new Paragraph("Phone Number: " + patient.getDemographic().getPhoneNumber(), regularBlackFont));
        if ( patient.getDemographic().getBloodGroup() != null ) {
            document.add(new Paragraph("Blood Group: " + patient.getDemographic().getBloodGroup(), regularBlackFont));
        }
        if ( olapPrescription.getPrescriptionDetails().getAge() != null ) {
            document.add(new Paragraph("Age: " + olapPrescription.getPrescriptionDetails().getAge(), regularBlackFont));
        }
        if ( olapPrescription.getPrescriptionDetails().getWeight() != null ) {
            document.add(new Paragraph("Weight: " + olapPrescription.getPrescriptionDetails().getWeight(), regularBlackFont));
        }
        if ( olapPrescription.getPrescriptionDetails().getHeight() != null ) {
            document.add(new Paragraph("Height: " + olapPrescription.getPrescriptionDetails().getHeight(), regularBlackFont));
        }

        document.add(new Paragraph(" "));

        document.add(new Paragraph("Dosage", boldBlackFont));
        List<Dosage> dosages = olapPrescription.getPrescriptionDetails().getDosages();
        for (Dosage dosage : dosages) {
            document.add(new Paragraph("Name of the medicine: " + dosage.getName(), regularBlackFont));
            document.add(new Paragraph("Days: " + dosage.getDays(), regularBlackFont));
            document.add(new Paragraph("Morning Dose: " + dosage.getMorningDose(), regularBlackFont));
            document.add(new Paragraph("Afternoon Dose: " + dosage.getAfternoonDose(), regularBlackFont));
            document.add(new Paragraph("Evening Dose: " + dosage.getEveningDose(), regularBlackFont));
            document.add(new Paragraph(" "));
        }

        document.add(new Paragraph("Notes: ", boldBlackFont));
        if ( olapPrescription.getNotes() != null ) {
            document.add(new Paragraph(olapPrescription.getNotes(), regularBlackFont));
        } else {
            document.add(new Paragraph("None", regularBlackFont));
        }

        document.close();

        return output.toByteArray();
    }

}
