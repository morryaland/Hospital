namespace back
{
    internal record class Person
    {
        int count;
        public int personId { get { return count++;  } }
        public DateTime birthday;
        public string? email;
        public string? home;
        public string? name;
        public string? pasport;
        public string? patronymic;
        public string? phone;
        public string? sex;
        public string? surname;
    }
}