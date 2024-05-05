package com.atyanidan.utils;

import com.atyanidan.entity.mysql.FieldWorker;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.entity.mysql.FormType;
import com.atyanidan.entity.mysql.Patient;
import com.itextpdf.text.DocumentException;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Component
public class PdfGenerator {
    public String generateFormPdf(Form form, FieldWorker fieldworker, Patient patient, Boolean isHealthy, Map<String, Object> questions, FormType formType) throws DocumentException {
        String healthStatus = isHealthy ? "unhealthy" : "healthy";

        StringBuilder sb = new StringBuilder();
        sb.append("<html>");
        sb.append("<head><title>Form Response</title></head>");
        sb.append("<body>");

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        sb.append("<p style='text-align: right'>" + formatter.format(date) + "</p>");

        sb.append("<center><h1>" + patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName() + "</h1></center>");
        sb.append("<center><h1>" + form.getTitle() + " Form Response" + "</h1></center>");

        sb.append("<h2>Submitted by: </h2>");
        sb.append("<p> Fieldworker Name: " + fieldworker.getFirstName() + " " + fieldworker.getLastName() + "</p>");
        sb.append("<p> Fieldworker Number: " + fieldworker.getEmpId() + "</p>");

        sb.append("<h2>" + "Candidate Demographic Details" + "</h2>");
        sb.append("<p>Name: " + patient.getDemographic().getFirstName() + " " + patient.getDemographic().getLastName() + "</p>");
        sb.append("<p>Phone Number: " + patient.getDemographic().getPhoneNumber() + "</p>");
        sb.append("<p>Address: " + patient.getDemographic().getAddress() + "</p>");
        sb.append("<p>Blood Group: " + patient.getDemographic().getBloodGroup() + "</p>");
        sb.append("<p>Taluka: " + patient.getDemographic().getTaluka().getName() + "</p>");

        sb.append("<p>Health Status: " + healthStatus + "</p>");

        sb.append("<p>Form Type: " + formType.toString() + "</p>");

        sb.append("<h2>" + "Response: " + "</h2>");

        for (String key : questions.keySet()) {
            sb.append("<p>" + key + " : " + questions.get(key) + "</p>");
        }

        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }

}
