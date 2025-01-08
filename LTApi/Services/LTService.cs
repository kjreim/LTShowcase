using LTApi.Configuration;
using LTApi.Models;

namespace LTApi.Services;

public class LTService {
    private readonly HttpClient _httpClient;

    public LTService(HttpClient httpClient, LTApiSettings settings) {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(settings.BaseAddress);
        _httpClient.DefaultRequestHeaders.Add(settings.LtApiHeader, settings.LtApiKey);
    }

    public async Task<Album[]> ListAlbums() {
        var response = await _httpClient.GetAsync("albums");
        response.EnsureSuccessStatusCode();
        var albums = await response.Content.ReadFromJsonAsync<Album[]>();
        return albums ?? [];
    }
}
