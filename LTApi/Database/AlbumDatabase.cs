using LTApi.Models;
using LTApi.Services;

namespace LTApi.Database;

public interface IAlbumDatabase
{
    Task<Album[]> ListAlbumsAsync();
    Task<Album?> GetAlbumAsync(int albumId);

    Task<Photo[]> ListPhotosAsync(int albumId);
    Task<Photo?> GetPhotoAsync(int photoId);
}

public class AlbumDatabase: IAlbumDatabase
{
    private readonly LTService _apiService;
    private bool _initialized = false;
    private Album[] Albums { get; set; } = [];
    private Photo[] Photos { get; set; } = [];

    public AlbumDatabase(LTService apiService) {
        _apiService = apiService;
    }

    public async Task<Album?> GetAlbumAsync(int albumId)
    {
        if (!_initialized)
            await Initialize();
        
        var album = Albums.FirstOrDefault(a => a.AlbumId == albumId);
        return album;
    }

    public async Task<Photo?> GetPhotoAsync(int photoId)
    {
        if (!_initialized) 
            await Initialize();
        
        var photo = Photos.FirstOrDefault(p => p.PhotoId == photoId);
        return photo;
    }

    public async Task<Album[]> ListAlbumsAsync()
    {
        if (!_initialized)
            await Initialize();
        
        return Albums;
    }

    public async Task<Photo[]> ListPhotosAsync(int albumId)
    {
        if (!_initialized)
            await Initialize();
        
        return Photos.Where(p => p.AlbumId == albumId).ToArray();
    }

    private async Task Initialize() {
        var response = await _apiService.ListAlbums();
        Albums = response;
        Photos = response.SelectMany(a => a.Photos).ToArray();
        _initialized = true;
    }
}