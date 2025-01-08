using LTApi.Database;
using LTApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LTApi.Controllers;

[Route("photo")]
[ApiController]
public class PhotoController : ControllerBase
{
    private readonly IAlbumDatabase _database;

    public PhotoController(IAlbumDatabase apiService)
    {
        _database = apiService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public async Task<ActionResult<Photo>> Get(int id)
    {
        var photo = await _database.GetPhotoAsync(id);
        if (photo == null)
            return NotFound();
        return Ok(photo);
    }
}