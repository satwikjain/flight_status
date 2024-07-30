import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib


# Utility function to send emails
def send_email(to_email, subject, message):
    from_email = os.getenv('EMAIL_USER')
    from_password = os.getenv('EMAIL_PASSWORD')

    if not from_email or not from_password:
        print(f"Missing email credentials: EMAIL_USER={from_email}, EMAIL_PASSWORD={from_password}")
        return
    
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, from_password)
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")