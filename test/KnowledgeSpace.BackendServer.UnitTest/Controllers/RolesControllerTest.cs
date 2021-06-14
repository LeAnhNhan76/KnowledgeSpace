using KnowledgeSpace.BackendServer.Controllers;
using KnowledgeSpace.BackendServer.Data;
using Microsoft.AspNetCore.Identity;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace KnowledgeSpace.BackendServer.UnitTest.Controllers
{
    public class RolesControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<RoleManager<IdentityRole>> _mockRoleManager;
        private List<IdentityRole> _roleResources = new List<IdentityRole>()
        {
            new IdentityRole("role-test-1"),
            new IdentityRole("role-test-2"),
            new IdentityRole("role-test-3"),
            new IdentityRole("role-test-4"),
        };

        public RolesControllerTest()
        {
            var roleStore = new Mock<IRoleStore<IdentityRole>>();

            _mockRoleManager = new Mock<RoleManager<IdentityRole>>(roleStore.Object, null, null, null, null);
        }

        [Fact]
        public void RolesController_ShouldCreateInstance_NotNull()
        {
            var rolesController = new RolesController(_mockRoleManager.Object, _context);

            Assert.NotNull(rolesController);
        }
    }
}