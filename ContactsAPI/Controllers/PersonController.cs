using ContactsAPÌ;
using ContactsAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly AppDbContext _context;

    public PersonController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return  Ok(await _context.Person.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var person = await _context.Person.FirstAsync(p => p.Id == id);
        return Ok(person);
    }
    [HttpPost]
    public async Task<IActionResult> Post(Person person)
    {
        await _context.Person.AddAsync(person);
        await _context.SaveChangesAsync();
        return Created($"/{person.Id}", person);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Person person)
    {
        person.Id = id;
        _context.Person.Update(person);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        _context.Person.Remove(new Person() { Id = id});
        await _context.SaveChangesAsync();
        return Ok();
    }
}