using LTApi.Database;
using LTApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LTApi.Controllers;

[Route("albums")]
[ApiController]
public class AlbumController : ControllerBase
{
    private readonly IAlbumDatabase _database;

    public AlbumController(IAlbumDatabase database) {
        _database = database;
    }

    [HttpGet]
    [ProducesResponseType(200)]
    public async Task<ActionResult<Album[]>> List()
    {
        var album = await _database.ListAlbumsAsync();
        return Ok(album);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public async Task<ActionResult<Album>> Get(int id)
    {
        var album = await _database.GetAlbumAsync(id);
        if (album == null)
            return NotFound();
        return Ok(album);
    }
}