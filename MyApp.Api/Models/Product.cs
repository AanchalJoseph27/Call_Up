namespace MyApp.Api.Models
{
    public class Product
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string? product_name { get; set; }
        public int category_id { get; set; }
        public DateTime? expiry_date {  get; set; }
        public DateTime? open_date { get; set; }
        public int numberofdays { get; set; }
        public DateTime? created_at { get; set; }

    }
}
