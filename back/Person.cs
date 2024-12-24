using System.Text;
using System.IO;
using System.Web;

namespace back
{
    internal record class Person
    {
        public int personId { get; set; }
        public string birthday { get; set; } = "";
        public string? email { get; set; }
        public string? home { get; set; }
        public string name { get; set; } = "unnamed";
        public string pasport { get; set; } = "0 0";
        public int PasportNumber { get { return Convert.ToInt32(pasport?.Split(' ')[0]); } }
        public int PasportSerial { get { return Convert.ToInt32(pasport?.Split(' ')[1]); } }
        public string? patronymic { get; set; } 
        public string? phone { get; set; }
        public string sex { get; set; } = "man";
        public string surname { get; set; } = "unnamed";
        public string photo { get; set; } = "";
        public byte[]? PhotoRaw { get { return DataUrlToBlob(photo); } }
        static byte[]? DataUrlToBlob(string dataUrl)
        {
            if (string.IsNullOrEmpty(dataUrl))
                throw new ArgumentNullException(nameof(dataUrl));

            // Split the Data URL into its components
            var parts = dataUrl.Split(new[] { ',' }, 2);
            if (parts.Length != 2)
                throw new FormatException("Invalid Data URL format.");

            // Get the base64 part
            var base64Data = parts[1];
            var data = Convert.FromBase64String(base64Data);
            // Decode the base64 string
            if (data.Length > 65535)
                return null;
            return data;
        }
        public static string ConvertByteArrayToUrlData(byte[] byteArray)
        {
           string base64String = Convert.ToBase64String(byteArray);
    return $"data:image;base64,{base64String}";
        }
    }
}
