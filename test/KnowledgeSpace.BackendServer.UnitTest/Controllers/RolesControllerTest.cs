using KnowledgeSpace.BackendServer.Controllers;
using KnowledgeSpace.BackendServer.Data;
using KnowledgeSpace.ViewModels.Systems;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MockQueryable.Moq;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public void ShouldCreateInstance_NotNull_Success()
        {
            var rolesController = new RolesController(_mockRoleManager.Object, _context);

            Assert.NotNull(rolesController);
        }

        [Fact]
        public async Task PostRole_ValidInput_Success()
        {
            _mockRoleManager.Setup(x => x.CreateAsync(It.IsAny<IdentityRole>()))
                .ReturnsAsync(IdentityResult.Success);
            var rolesController = new RolesController(_mockRoleManager.Object, _context);

            var result = await rolesController.PostRole(new RoleCreateRequest
            {
                Id = "role1",
                Name = "Role 1"
            });

            Assert.NotNull(result);
            Assert.IsType<CreatedAtActionResult>(result);
        }

        [Fact]
        public async Task PostRole_ValidInput_Failed()
        {
            _mockRoleManager.Setup(x => x.CreateAsync(It.IsAny<IdentityRole>()))
                .ReturnsAsync(IdentityResult.Failed(new IdentityError[] { }));

            var rolesController = new RolesController(_mockRoleManager.Object, _context);
            var result = await rolesController.PostRole(new RoleCreateRequest
            {
                Id = "test",
                Name = "test"
            });

            Assert.NotNull(result);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task GetRoles_HasData_Success()
        {
            _mockRoleManager.Setup(x => x.Roles)
                .Returns(_roleResources.AsQueryable().BuildMock().Object);

            var rolesController = new RolesController(_mockRoleManager.Object, _context);
            var result = await rolesController.GetRoles();
            var okResult = result as OkObjectResult;
            var rolesVm = okResult.Value as IEnumerable<RoleVm>;

            Assert.NotNull(result);
            Assert.IsType<OkObjectResult>(result);
            Assert.True(rolesVm.Count() > 0);
        }
    }
}