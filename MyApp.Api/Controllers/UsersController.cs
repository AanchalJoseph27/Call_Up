using System.CodeDom;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;
using MyApp.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EmailService _emailService;
    private readonly ProductService _productService;


    public UsersController(AppDbContext context, EmailService emailService, ProductService productService)
    {
        _context = context;
        _emailService = emailService;
        _productService = productService;

    }

    //USER

    //Registration success Mail
    [HttpPost("register")]
    public async Task<IActionResult> Register(User model)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == model.Email);

        if (existingUser != null)
        {
            return BadRequest("Email already registered.");
        }

        //model.CreatedDate = DateTime.Now;

        _context.Users.Add(model);
        await _context.SaveChangesAsync();

        await _emailService.SendEmailAsync(
    model.Email!,
    "Registration Successful",
    $"<h3>Welcome</h3><h2>Hello {model.Name}</h2><p>Your account was created successfully.</p>"
);
        return Ok("User registered successfully.");
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.Users.ToList());
    }


    //LOGIN
    [HttpPost("login")]
    public IActionResult Login([FromBody] User model)
    {
        var user = _context.Users.ToList();
        var logUser = user.Where(u => u.Email == model.Email && u.Password == model.Password).FirstOrDefault();
        if (user != null) {

            return Ok(logUser);

        }

        return Ok();

    }



    //PRODUCT

    [HttpPost("product")]
    public async Task<IActionResult> Create([FromBody] Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return Ok(product);
    }

    [HttpGet("product")]
    public IActionResult GetAllProducts()
    {
        return Ok(_context.Products.ToList());
    }





    [HttpGet("product/{userId}")]
    public async Task<IActionResult> GetAllProductByUserId(int userId)
    {
        var products = await (
            from p in _context.Products
            join c in _context.Categories
                on p.category_id equals c.id
            where p.user_id == userId
            select new
            {
                p.id,
                p.user_id,
                p.product_name,
                p.category_id,
                Category = c.category_name,
                p.expiry_date,
                p.open_date,
                p.numberofdays
            }
        ).ToListAsync();

        return Ok(products);
    }

    [HttpGet("productexp/{userId}")]
    public async Task<IActionResult> GetAllProductExpByUserId(int userId)
    {
        //    DateTime givenDate = new DateTime(2024, 3, 10);
        //    var products = await (
        //        from p in _context.Products
        //        join c in _context.Categories
        //            on p.category_id equals c.id
        //        where p.user_id == userId 
        //        select new
        //        {
        //            p.id,
        //            p.product_name,
        //            p.category_id,
        //            Category = c.category_name,
        //            p.expiry_date,
        //            p.open_date,
        //            p.numberofdays
        //        }
        //    ).ToListAsync();

        //    //DateTime resultDate = openDate.AddDays(numberOfDays);

        //    var openProducts=products.Where(p=>p.open_date!=null &&p.numberofdays!=0)
        //                              .Select(p => new
        //                              {
        //                                  p.id,
        //                                  p.product_name,
        //                                  p.category_id,
        //                                  p.open_date,
        //                                  p.numberofdays,
        //                                  p.Category,
        //                                  expiry_date = p.open_date?.AddDays(p.numberofdays)
        //                              })
        //.ToList();

        //    var otherProducts = products.Where(p => p.numberofdays == 0)
        //                              .Select(p => new
        //                              {
        //                                  p.id,
        //                                  p.product_name,
        //                                  p.category_id,
        //                                  p.open_date,
        //                                  p.numberofdays,
        //                                  p.Category,
        //                                  expiry_date = p.expiry_date
        //                              })
        //.ToList();
        //    var allProducts = openProducts.Concat(otherProducts).ToList();

        //    var currentMonth = DateTime.Now.Month;
        //    var currentYear = DateTime.Now.Year;

        //    var expproduct = allProducts
        //        .Where(ap => ap.expiry_date?.Month == currentMonth &&
        //                    ap.expiry_date?.Year == currentYear)
        //        .ToList();


        //    return Ok(expproduct);

        var expproduct = await _productService.GetExpiringProducts();
        var explist = expproduct.Where(exp => exp.user_id == userId).ToList();
        return Ok(explist);
    }


    [HttpGet("productexp1/{userId}")]
    public async Task<IActionResult> GetProductExpByUserId(int userId)
    {
        var expproducts = await (
     from p in _context.Products
     join c in _context.Categories
         on p.category_id equals c.id
     select new ProductExp
     {
         id = p.id,
         user_id = p.user_id,
         product_name = p.product_name,
         category_id = p.category_id,
         category_name = c.category_name,
         open_date = p.open_date,
         numberofdays = p.numberofdays,
         expiry_date = p.open_date != null && p.numberofdays != 0
             ? p.open_date.Value.AddDays(p.numberofdays)
             : p.expiry_date
     }
        ).ToListAsync();

        var currentDate = DateTime.Now;

        var expproduct = expproducts
            .Where(ap => ap.expiry_date?.Month == currentDate.Month &&
                         ap.expiry_date?.Year == currentDate.Year)
            .ToList();
        var explists = expproduct.Where(exp => exp.user_id == userId).ToList();
        return Ok(explists);
    }

       

    //CATEGORY


    [HttpPost("category")]
    public async Task<IActionResult> Create([FromBody] Category category)
    {
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
        return Ok(category);
    }

    [HttpGet("category")]
    public IActionResult GetAllCategory()
    {
        return Ok(_context.Categories.ToList());
    }
}
