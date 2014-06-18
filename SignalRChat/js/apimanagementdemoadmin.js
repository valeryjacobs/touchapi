$(function () {
    function createUUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }



    var presets = [{
        "Name": "Demo1 Flickr call with 'tags' parameter.",
        "Order": 0,
        "Settings":
        {
            "head": "Flickr API Demo",
            "headtext": "Let's call the flickr REST API and have some fun!",
            "buttontext": "MAKE CALL",
            "url": "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            "method": "GET",
            "requestform": {
                "html":
                [
                    {
                        "name": "tags",
                        "id": "tags",
                        "caption": "tags",
                        "type": "text",
                        "placeholder": "Enter a the 'tags' param.",
                        "value": "holiday"
                     
                    }
                ]
            },
            "user": "me",
            "pwd": "youwish",
            "headers": "",
            "requesttitle": "Fill in the form to set the request body:",
            "request": { "tags": "default", "tagmode": "any", "format": "json" },
        }
    },

      {
          "Name": "Demo2",
          "Order": 0,
          "Settings":
          {
              "head": "Attendee OData feed. List all attendees.",
              "headtext": "Let's call an ODATA service and see what happens!",
              "buttontext": "GET ATTENDEES",
              "url": "http://apimanagementdemo.azurewebsites.net/odata/Attendees",
              "method": "GET",
              "requestform": "",
              "user": "me",
              "pwd": "youwish",
              "headers": "",
              "requesttitle": "No parameters for this request defined.",
              "request": "",
          }
      },
      {
          "Name": "Demo3",
          "Order": 0,
          "Settings":
           {
               "head": "OData feed demo",
               "headtext": "Let's call an ODATA service and see what happens!",
               "buttontext": "ADD ATTENDEE",
               "url": "http://localhost:52527/odata/Attendees",
               "method": "PUT",
               "requestform": {

                   "html":
                   [
                       {
                           "name": "Name",
                           "id": "Name",
                           "caption": "Name",
                           "type": "text",
                           "placeholder": "Enter the attendee name.",
                           "value": "George Clone-y"
                       },
      {
          "name": "Company",
          "id": "Company",
          "caption": "Company",
          "type": "text",
          "placeholder": "Enter the company name.",
          "value": "Clone Inc."
      },
       {
           "name": "Recurring",
           "id": "Recurring",
           "caption": "Recurring",
           "type": "checkbox",
           "placeholder": "Has the attendee visited WAZUGNL before?",
           "value": true
       }
                   ]
               },
               "user": "me",
               "pwd": "youwish",
               "headers": "",
               "requesttitle": "No parameters for this request defined.",
               "request": { Name: 'default', Company: 'any', Recurring: true, IaaS: true, PaaS: true, SaaS: true }
           }
      },
      {
          "Name": "Demo4: ESPN Call with key.",
          "Order": 4,
          "Settings":
          {
              "head": "ESPN API Demo",
              "headtext": "Let's call the ESPN REST API and see some athletes.",
              "buttontext": "MAKE CALL",
              "url": "http://api.espn.com/v1/sports/baseball/mlb/athletes?apikey=mbyqk3ca2xrdw98dvha8ydt8",
              "method": "GET",
              "requestform": "",
              "user": "",
              "pwd": "",
              "headers": "",
              "requesttitle": "No paremeters needed:",
              "request": "",
          }
      }
    ];


    //http://api.espn.com/v1/sports/baseball/mlb/athletes?apikey=mbyqk3ca2xrdw98dvha8ydt8
    //"ID":"755e8c0a-1060-4328-8e47-34c196dcd426","Name":"George","Company":"CMG","Recurring":true,"IaaS":true,"PaaS":true,"SaaS":true


    var queryResult = Enumerable.From(presets).Select().ToArray();

    function ViewModel() {
        this.title = ko.observable("API Management Demo App");
        this.head = ko.observable("Flickr API Demo");

        this.headtext = ko.observable("Let's call the flickr REST API and have some fun!");
        this.buttontext = ko.observable("Call Flickr API");
        this.url = ko.observable("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?");
        this.method = ko.observable("GET");
        this.requestform = ko.observable({
            "html":
            [
                {
                    "name": "tags",
                    "id": "tags",
                    "caption": "tags",
                    "type": "text",
                    "placeholder": "Enter a the 'tags' param.",
                    "value": "holiday"
                }
            ]
        });
        this.user = ko.observable("me");
        this.pwd = ko.observable("S@cret");
        this.headers = ko.observable("");
        this.requesttitle = ko.observable("Fill in the form to set the request body:");
        this.request = ko.observable({ tags: "default", tagmode: "any", format: "json" });
        this.responsetitle = ko.observable("Response:");
        this.availablePresets = ko.observable(queryResult);
        this.selectedPreset = ko.observable();
    };

    var avm = new ViewModel();
    ko.applyBindings(avm);

    var chat = $.connection.chatHub;

    $.connection.hub.start().done(function () {
        $('#button').click(function () {
            var jsonData = ko.toJSON(avm.selectedPreset().Settings);
            chat.server.send(jsonData);
        });
    });


});