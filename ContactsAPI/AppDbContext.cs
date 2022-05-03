using ContactsAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPÌ;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Person> Person { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
    }
}
