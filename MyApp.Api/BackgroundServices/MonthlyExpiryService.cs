
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

public class MonthlyExpiryService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;


    public MonthlyExpiryService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("Service running at: " + DateTime.Now);
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.Now;
            //if (true)//TESTING
            if (now.Day == 1) // Run only on first day of month
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var productService = scope.ServiceProvider.GetRequiredService<ProductService>();

                    var expProducts = await productService.GetExpiringProducts();
                    Console.WriteLine("Products count: " + (expProducts?.Count ?? 0));

                    if (expProducts != null && expProducts.Any())
                    {
                        var emailService = scope.ServiceProvider.GetRequiredService<EmailService>();

                        try
                        {
                            Console.WriteLine("Sending email...");
                            await emailService.SendExpiryMail(expProducts);
                            Console.WriteLine("Email sent successfully");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Email failed: " + ex.Message);
                        }
                    }
                    else
                    {
                        Console.WriteLine("No products to send");

                        //var emailService = scope.ServiceProvider.GetRequiredService<EmailService>();

                        //try
                        //{
                        //    Console.WriteLine("Sending no-expiry email...");
                        //    await emailService.SendNoExpiryMail(); 
                        //    Console.WriteLine("No-expiry email sent successfully");
                        //}
                        //catch (Exception ex)
                        //{
                        //    Console.WriteLine("No-expiry email failed: " + ex.Message);
                        //}
                    }
                }
            }

            
           // await Task.Delay(TimeSpan.FromHours(24), stoppingToken);// Check once every 24 hours
           // await Task.Delay(TimeSpan.FromMinutes(10), stoppingToken);//TESTING
            await Task.Delay(TimeSpan.FromDays(7), stoppingToken); // Check once every 7 Days

            Console.WriteLine("MonthlyExpiryService running at: " + DateTime.Now);
        }
    }
}