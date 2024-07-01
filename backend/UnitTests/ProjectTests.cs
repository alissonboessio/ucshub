using Moq;
using NUnit.Framework;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository;
using UcsHubAPI.Repository.Repositories;
using UcsHubAPI.Service.Services;

namespace UcsHubAPI.Tests
{
    [TestFixture]
    public class ProjectServiceTests
    {
        private Mock<IRepository<ProjectModel>> _mockProjectRepository;

        [SetUp]
        public void Setup()
        {
            _mockProjectRepository = new Mock<IRepository<ProjectModel>>();
        }

        [Test]
        public void GetById_IdValido_RetornaProject()
        {
            var project = new ProjectModel { Id = 1, Title = "Projeto teste", Description = "Descricao" };
            _mockProjectRepository.Setup(repo => repo.GetById(1)).Returns(project);

            var result = _mockProjectRepository.Object.GetById(1);

            Assert.IsNotNull(result);
            Assert.AreEqual(project.Title, result.Title);
        }

        [Test]
        public void GetById_IdInvalido_ReturnsNull()
        {
            _mockProjectRepository.Setup(repo => repo.GetById(2)).Returns((ProjectModel)null);

            var result = _mockProjectRepository.Object.GetById(2);

            Assert.IsNull(result);
        }

        [Test]
        public void Add_ProjectValido_RetornaTrue()
        {
            var project = new ProjectModel { Id = 1, Title = "Projeto Teste", Description = "Descricao" };
            _mockProjectRepository.Setup(repo => repo.Add(project)).Returns(true);

            var result = _mockProjectRepository.Object.Add(project);

            Assert.IsTrue(result);
        }

        [Test]
        public void Update_ProjectValido_RetornaTrue()
        {
            var project = new ProjectModel { Id = 1, Title = "Projeto Teste", Description = "Descricao" };
            _mockProjectRepository.Setup(repo => repo.Update(project)).Returns(true);

            var result = _mockProjectRepository.Object.Update(project);

            Assert.IsTrue(result);
        }
    }
}
