namespace LTApi.Models;
public class Photo
{
    public int PhotoId { get; set; }
    public int AlbumId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
