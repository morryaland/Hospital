namespace back
{
    internal record class Pacient
    {
        public int pacientId { get; set; }
        public string? diagnostics { get; set; }
        public string? lastEntry { get; set; }
        public string? medicalHistory { get; set; }
        public string? nextEntry { get; set; }
        public int personId { get; set; }
        public string policyNumber { get; set; }
        public string policyValidity { get; set; }
        public string cardNumber { get; set; }
        public string? cardValidity { get; set; }
    }
}