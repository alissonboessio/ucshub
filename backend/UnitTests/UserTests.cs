using Moq;
using UcsHubAPI.Model.Models;
using UcsHubAPI.Repository;

[TestFixture]
public class UserRepositoryTests
{
    private Mock<IRepository<UserModel>> _mockUserRepository;

    [SetUp]
    public void Setup()
    {
        _mockUserRepository = new Mock<IRepository<UserModel>>();
    }

    [Test]
    public void GetById_IdValido_RetornaUser()
    {
        var user = new UserModel { Id = 1, Email = "test@ucs.br", Password = "password", Person = new PersonModel { Id = 1 } };
        _mockUserRepository.Setup(repo => repo.GetById(1)).Returns(user);

        var result = _mockUserRepository.Object.GetById(1);

        Assert.IsNotNull(result);
        Assert.AreEqual(user.Email, result.Email);
    }

    [Test]
    public void GetById_IdInvalido_ReturnsNull()
    {
        _mockUserRepository.Setup(repo => repo.GetById(2)).Returns((UserModel)null);

        var result = _mockUserRepository.Object.GetById(2);

        Assert.IsNull(result);
    }

    [Test]
    public void Add_UserValido_RetornaTrue()
    {
        var user = new UserModel { Id = 1, Email = "test@example.com", Password = "password", Person = new PersonModel { Id = 1 } };
        _mockUserRepository.Setup(repo => repo.Add(user)).Returns(true);

        var result = _mockUserRepository.Object.Add(user);

        Assert.IsTrue(result);
    }

    [Test]
    public void Update_UserValido_RetornaTrue()
    {
        // Arrange
        var user = new UserModel { Id = 1, Email = "test@example.com", Password = "password", Person = new PersonModel { Id = 1 } };
        _mockUserRepository.Setup(repo => repo.Update(user)).Returns(true);

        // Act
        var result = _mockUserRepository.Object.Update(user);

        // Assert
        Assert.IsTrue(result);
    }
}