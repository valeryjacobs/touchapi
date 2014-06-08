using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIManagementDemo.Entities
{
    public class Attendee
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public bool Recurring { get; set; }
        public bool IaaS { get; set; }
        public bool PaaS { get; set; }
        public bool SaaS { get; set; }
    }
}