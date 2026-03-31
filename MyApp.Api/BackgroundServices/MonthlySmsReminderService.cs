using MyApp.Api.Data; 
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

public class MonthlySmsReminderService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public MonthlySmsReminderService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var smsService = scope.ServiceProvider.GetRequiredService<SmsService>();
                var productService = scope.ServiceProvider.GetRequiredService<ProductService>();

               


                var expProducts = await productService.GetExpiringProducts();
                Console.WriteLine("Products count: " + (expProducts?.Count ?? 0));

                // Only send if list is not empty
                if (expProducts != null && expProducts.Any())

                {
                    foreach (var p in expProducts)
                    {
                        //var phone = p.phonenumber; // Make sure you have phone number in DB
                        var phone = p.phonenumber?.Trim();
                        Console.WriteLine( p.phonenumber);

                        if (string.IsNullOrEmpty(phone))
                        {
                            Console.WriteLine($"Skipping product {p.product_name} because phone number is missing.");
                            continue; // Skip this product
                        }
                        var message = $"Reminder: {p.product_name} expires on {p.expiry_date?.ToString("dd-MM-yyyy")}";

                        // for use
                        smsService.SendSms(phone, message);

                        // For testing 
                        //smsService.SendSms(phone, message);
                        //Console.WriteLine($"TEST: Would send SMS to {phone}: {message}");
                    }
                }
            }

            // Wait until next check
            var now = DateTime.Now;

            // Calculate delay until next day 00:01 //for use
            //var nextCheck = DateTime.Today.AddDays(1).AddMinutes(1);//Check next day 
            var nextCheck = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)
                    .AddMinutes(1);
            var delay = nextCheck - now;

            //for testing, 10 seconds
            //var delay = TimeSpan.FromSeconds(10);

            await Task.Delay(delay, stoppingToken);
        }
    }
}