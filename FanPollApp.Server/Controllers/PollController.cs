using Microsoft.AspNetCore.Mvc;
using FanPollApp.Models;
using Microsoft.AspNetCore.Http.Connections;
namespace FanPollApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PollController : ControllerBase
    {
        private static List<PollOption> pollOptions = new()
        {
            new PollOption { Id = 1, Name = "Mickey Mouse", Votes = 0 },
            new PollOption { Id = 2, Name = "Elsa", Votes = 0 },
            new PollOption { Id = 3, Name = "Iron Man", Votes = 0 },
            new PollOption { Id = 4, Name = "Buzz Lightyear", Votes = 0 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<PollOption>> GetOptions()
        {
            return Ok(pollOptions);
        }

        [HttpPost("{id}")]
        public IActionResult Vote(int id)
        {
            var option = pollOptions.FirstOrDefault(o => o.Id == id);
            if (option == null)
            {
                return NotFound();
            }

            option.Votes++;
            return Ok(option);
        }
    }
}
