﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Core3Shop.Models;
using Core3Shop.Utility.Consts;
using Core3Shop.Al.Contracts;
using Core3Shop.Managers;

namespace Core3Shop.Controllers
{
    [Area(AreaNames.Customer)]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAlHome _alHome;
        public HomeController(ILogger<HomeController> logger, IAlHome alHome)
        {
            _logger = logger;
            _alHome = alHome;
        }

        public IActionResult Index()
        {
            var model = _alHome.GetHomeModel();
            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Details(int id)
        {
            var model = _alHome.GetServiceDetailsModel(id);
            return View(model);
        }
        public IActionResult AddToCart(int serviceId)
        {
            var session = new SessionManager(HttpContext);
            session.AddToCart(serviceId);
            return RedirectToAction(nameof(Index));
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
