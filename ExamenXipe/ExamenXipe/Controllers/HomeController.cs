using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ExamenXipe.Models;
using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace ExamenXipe.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            using (var client = new HttpClient())
            {

                client.BaseAddress = new Uri("https://prod-42.westus.logic.azure.com/");

              

                var result = client.GetAsync("workflows/b0a4ba32ccd44938b3ba5e9cc4d1d2fa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5FGR4qL3YLaJB7Wd7j7mEx1OKtXG7GVlG9XHlTwAWvA");

                var r = result.Result;
                var responseJson = result.Result.Content.ReadAsStringAsync();
                if (responseJson.Result == "")
                {
                    ViewBag.modelMenu = "[]";

                }
                else
                {
                    ViewBag.Response = responseJson.Result;
                }
            }
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
