package com.atyanidan.utils;

import com.atyanidan.entity.Patient;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.elasticsearch.OlapPrescription;
import com.atyanidan.entity.elasticsearch.OlapPrescription.PrescriptionDetails.Dosage;
import com.itextpdf.text.DocumentException;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class PdfGenerator {
    public String generatePrescriptionPdf(Doctor doctor, Patient patient, OlapPrescription olapPrescription) throws DocumentException {
        StringBuilder sb = new StringBuilder();
        sb.append("<html>");
        sb.append("<head><title>Prescription Details</title></head>");
        sb.append("<body>");

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        sb.append("<p style='text-align: right'>" + formatter.format(date) + "</p>");

        sb.append("<center><h1>" + patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName() + "</h1></center>");
        sb.append("<center><h1>" + olapPrescription.getFormTitle() + " Prescription" + "</h1></center>");

        sb.append("<p style='color: blue'>" + "Dr. " + doctor.getFirstName() + " " + doctor.getLastName() + "</p>");
        sb.append("<p style='color: blue'>" + doctor.getSpecialisation().getName() + "</p>");
        sb.append("<p style='color: blue'>" + doctor.getHospitalAddress() + "</p>");
        sb.append("<p style='color: blue'>" + doctor.getNearestRailwayStation() + "</p>");
        sb.append("<p style='color: blue'>" + doctor.getPhoneNumber() + "</p>");

        sb.append("<h2>Patient Details</h2>");

        sb.append("<p>Name: " + patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName() + "</p>");
        sb.append("<p>Phone Number: " + patient.getDemographic().getPhoneNumber() + "</p>");

        if ( patient.getDemographic().getBloodGroup() != null ) {
            sb.append("<p>Blood Group: " + patient.getDemographic().getBloodGroup() + "</p>");
        }
        if ( olapPrescription.getPrescriptionDetails().getAge() != null ) {
            sb.append("<p>Age: " + olapPrescription.getPrescriptionDetails().getAge() + "</p>");
        }
        if ( olapPrescription.getPrescriptionDetails().getWeight() != null ) {
            sb.append("<p>Weight: " + olapPrescription.getPrescriptionDetails().getWeight() + "</p>");
        }
        if ( olapPrescription.getPrescriptionDetails().getHeight() != null ) {
            sb.append("<p>Height: " + olapPrescription.getPrescriptionDetails().getHeight() + "</p>");
        }

        sb.append("<h2>Dosage</h2>");
        List<Dosage> dosages = olapPrescription.getPrescriptionDetails().getDosages();
        for (Dosage dosage : dosages) {
            sb.append("<p>Name of the medicine: " + dosage.getName() + "</p>");
            sb.append("<p>Days: " + dosage.getDays() + "</p>");
            sb.append("<p>Morning Dose: " + dosage.getMorningDose() + "</p>");
            sb.append("<p>Afternoon Dose: " + dosage.getAfternoonDose() + "</p>");
            sb.append("<p>Evening Dose: " + dosage.getEveningDose() + "</p>");
            sb.append("<br />");
        }

        sb.append("<h2>Notes: </h2>");
        if ( olapPrescription.getNotes() != null ) {
            sb.append("<p>" + olapPrescription.getNotes() + "</p>");
        } else {
            sb.append("<p>None</p>");
        }

        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }

}
