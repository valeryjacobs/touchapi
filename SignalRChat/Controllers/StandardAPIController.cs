using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIManagementDemo.Controllers
{
    public class StandardAPIController : ApiController
    {
        // GET: api/Standard
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Standard/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Standard
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Standard/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Standard/5
        public void Delete(int id)
        {
        }
    }
}
