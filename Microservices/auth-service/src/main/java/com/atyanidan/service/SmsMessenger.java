package com.atyanidan.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SmsMessenger {
    public static final String ACCOUNT_SID = "";
    public static final String AUTH_TOKEN = "";

    public static final String otpSmsMessage = "Your AtyaNidan Verification Code is ";

    public static final String TWILIO_NUMBER = "+12176002422";

    public void sendSms(String toPhoneNumber, String otp) {
        System.out.println("Sending OTP " + otp + " to phone number " + toPhoneNumber);
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("+91" + toPhoneNumber),
                        new PhoneNumber(TWILIO_NUMBER),
                        otpSmsMessage + otp)
                .create();
    }
}
