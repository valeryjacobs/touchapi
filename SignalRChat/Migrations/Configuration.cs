namespace APIManagementDemo.Migrations
{
    using APIManagementDemo.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<APIManagementDemo.Models.AttendeeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(APIManagementDemo.Models.AttendeeContext context)
        {
            context.Attendees.AddOrUpdate(new Attendee[] {
                new Attendee() { ID = Guid.NewGuid(), Name = "Piet", Company = "CMG", Recurring = true, IaaS= true, PaaS = true, SaaS = true },
                new Attendee() { ID = Guid.NewGuid(), Name = "Klaas", Company = "CMG", Recurring = true, IaaS= true, PaaS = true, SaaS = true },
                new Attendee() { ID = Guid.NewGuid(), Name = "Jan", Company = "CMG", Recurring = true, IaaS= true, PaaS = true, SaaS = true },
                new Attendee() { ID = Guid.NewGuid(), Name = "George", Company = "CMG", Recurring = true, IaaS= true, PaaS = true, SaaS = true }
            });
        }
    }
}
