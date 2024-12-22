namespace back
{
    internal record class Pacient
    {
        private int count;

        public int pacientId { get { return count++; } }
        public string? diagnostics;
        public DateTime lastEntry;
        public string? medicalHistory;
        public DateTime nextEntry;
        public int personId;
        public string? policyNumber;
        public DateTime policyValidity;
    }
}