using System.CodeDom;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;
using MyApp.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EmailService _emailService;
    private readonly ProductService _productService;
    private readonly IConfiguration _configuration;


    public UsersController(AppDbContext context, EmailService emailService, ProductService productService, IConfiguration configuration)
    {
        _context = context;
        _emailService = emailService;
        _productService = productService;
        _configuration = configuration;

    }

    //USER

    //Registration success Mail
    [HttpPost("register")]
    public async Task<IActionResult> Register(User model)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.email == model.email);

        if (existingUser != null)
        {
            return BadRequest("Email already registered.");
        }

        //model.CreatedDate = DateTime.Now;

        _context.Users.Add(model);
        await _context.SaveChangesAsync();

        await _emailService.SendEmailAsync(
    model.email!,
    "Registration Successful",
    $"<h3>Welcome</h3><h2>Hello {model.name}</h2><p>Your account was created successfully.</p>"
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
        var user = _context.Users
            .FirstOrDefault(u => u.email == model.email && u.password == model.password);

        if (user == null)
        {
            return BadRequest("User does not exist!");
        }

        // 🔐 Create token
        var keyString = _configuration["Jwt:Key"];

        if (string.IsNullOrEmpty(keyString))
        {
            throw new Exception("JWT Key is missing in appsettings.json");
        }

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(keyString)
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

       if (string.IsNullOrEmpty(user.email))
{
    return BadRequest("User email is missing");
}

var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.email),
    new Claim("id", user.id.ToString())

    };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        // ✅ Return token
        return Ok(new
        {
            token = tokenString,
            user = user
        });
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
            where p.user_id == userId && p.IsDelete == false
            select new
            {
                p.id,
                p.user_id,
                p.product_name,
                p.category_id,
                Category = c.category_name,
                p.expiry_date,
                p.open_date,
                p.numberofdays,p.IsDelete
            }
        ).ToListAsync();

        return Ok(products);
    }

    [HttpGet("productexp/{userId}")]//email
    public async Task<IActionResult> GetAllProductExpByUserId(int userId)
    {
        var expproduct = await _productService.GetExpiringProducts();
        var explist = expproduct.Where(exp => exp.user_id == userId ).ToList();
        return Ok(explist);
    }


    [HttpGet("productexp1/{userId}")]//table display
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
        ).Where(p=>p.IsDelete==false).ToListAsync();

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


    //UPDATE
    
     [HttpPut("UpdateProduct/{id}")]
public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
{
    if (id != updatedProduct.id)
    {
        return BadRequest(new { message = "Product ID mismatch" });
            Console.WriteLine("Product ID mismatch");

        }

        var product = await _context.Products.FindAsync(id);

    if (product == null || product.IsDelete)
    {
        return NotFound(new { message = "Product not found" });
            Console.WriteLine("Product not found");

        }

        // Update fields
        product.product_name=updatedProduct.product_name;
    product.expiry_date= updatedProduct.expiry_date;
    product.numberofdays=updatedProduct.numberofdays;
    product.open_date= updatedProduct.open_date;
    product.category_id=updatedProduct.category_id;

    await _context.SaveChangesAsync();

    return Ok(new { message = "Product updated successfully" });
        Console.WriteLine("Product updated successfully");

    }


    //DELETE

    [HttpDelete("DeleteProduct/{id}")]
public async Task<IActionResult> DeleteProduct(int id)
{
    var product = await _context.Products.FindAsync(id);

    if (product == null)
    {
        return NotFound(new { message = "Product not found" });
            Console.WriteLine("Product not found");
        }

    product.IsDelete = true;

    await _context.SaveChangesAsync();
        return Ok(new { message = "Product deleted successfully" });
        Console.WriteLine("Product deleted successfully");

    }

}
