namespace MyApp.Api.Models
{
    public class Category
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string? category_name { get; set; }
        public bool IsDeleted { get; set; }

    }
}
