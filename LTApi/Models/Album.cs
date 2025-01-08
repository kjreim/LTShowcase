namespace LTApi.Models;

public class Album
{
    public int AlbumId { get; set; }
    public Photo[] Photos { get; set; } = [];
}