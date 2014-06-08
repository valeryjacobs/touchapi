using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
namespace SignalRChat
{
    public class ChatHub : Hub
    {
        public void Send(string stateInput)
        {
            Clients.All.updateState(stateInput);
        }
    }
}