using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using APIManagementDemo.Entities;
using System.Web.Http.Cors;

namespace APIManagementDemo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("http://apimanagementdemo.azurewebsites.net,http://apitouch.nl,http://localhost:52527", "*", "*");
            config.EnableCors(cors);

            //config.EnableCors();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Attendee>("Attendees");
            config.Routes.MapODataRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}
