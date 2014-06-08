namespace APIManagementDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attendees",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Name = c.String(),
                        Company = c.String(),
                        Recurring = c.Boolean(nullable: false),
                        IaaS = c.Boolean(nullable: false),
                        PaaS = c.Boolean(nullable: false),
                        SaaS = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Attendees");
        }
    }
}
