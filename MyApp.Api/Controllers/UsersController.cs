using Microsoft.AspNetCore.Mvc;
using MyApp.Api.Data;
using MyApp.Api.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.Users.ToList());
    }
}
