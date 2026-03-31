using System.Net;
using System.Net.Mail;
using MyApp.Api.Models;   // adjust based on your project

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtp = new SmtpClient(_config["EmailSettings:Host"])
        {
            Port = int.Parse(_config["EmailSettings:Port"] ?? "587"),
            Credentials = new NetworkCredential(
        _config["EmailSettings:Email"],
        _config["EmailSettings:Password"]
    ),
            EnableSsl = true
        };

        var message = new MailMessage
        {
            From = new MailAddress(_config["EmailSettings:Email"] ?? ""),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        message.To.Add(toEmail);

        await smtp.SendMailAsync(message);
    }


    public async Task SendExpiryMail(List<ProductExp> expProducts)
    {
        Console.WriteLine("Email method triggered");

        var grouped = expProducts.GroupBy(p => p.user_email);

        foreach (var group in grouped)
        {
            var toEmail = group.Key;

            // ✅ Skip if email is null or empty
            if (string.IsNullOrWhiteSpace(toEmail))
            {
                continue;
            }

            string subject = "Expiring Products Alert";
            string body = "The following products are expiring this month:\n";

            foreach (var p in group)
            {
                body += $"{p.product_name} - {p.expiry_date:dd-MM-yyyy}\n";
            }

            await SendEmailAsync(toEmail, subject, body);
        }
    }
}