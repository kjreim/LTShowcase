using LTApi.Configuration;
using LTApi.Database;
using LTApi.Services;

var builder = WebApplication.CreateBuilder(args);

#region Configuration
var ltSettings = new LTApiSettings();
builder.Configuration.Bind("LTApiSettings", ltSettings);
var corsSettings = new CorsSettings();
builder.Configuration.Bind("CorsSettings", corsSettings);

builder.Services.AddSingleton(ltSettings);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Dev", policyBuilder => {
        policyBuilder.SetIsOriginAllowed(_ => true)
            .WithOrigins(corsSettings.AllowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

#endregion

// Add services to the container.
#region Services
builder.Services.AddHttpClient<LTService>();
builder.Services.AddSingleton<IAlbumDatabase, AlbumDatabase>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Dev");
// app.UseAuthorization();

app.MapControllers();

app.Run();
