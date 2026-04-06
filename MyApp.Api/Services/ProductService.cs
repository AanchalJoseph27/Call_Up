using MyApp.Api.Data;
using MyApp.Api.Models;
using Microsoft.EntityFrameworkCore;

public class ProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductExp>> GetExpiringProducts()
    {
        var products = await (
        from p in _context.Products
        join c in _context.Categories
            on p.category_id equals c.id
        join u in _context.Users
            on p.user_id equals u.id
        select new ProductExp
        {
         id = p.id,
         product_name = p.product_name,
         phonenumber=u.phonenumber,
         user_id=p.user_id,
            user_name = u.name,        
            user_email = u.email,
            category_id = p.category_id,
         category_name = c.category_name,
         open_date = p.open_date,
         numberofdays = p.numberofdays,
         expiry_date = p.open_date != null && p.numberofdays != 0
             ? p.open_date.Value.AddDays(p.numberofdays)
             : p.expiry_date
     }
        ).Where(p=>p.IsDelete==false).ToListAsync();

        var now = DateTime.Now;

        var expproduct = products
            .Where(ap => ap.expiry_date?.Month == now.Month &&
                         ap.expiry_date?.Year == now.Year)
            .ToList();

        return expproduct;
    }
}